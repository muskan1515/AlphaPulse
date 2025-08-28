from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import os
from datetime import datetime
import time
import asyncio

def download_chartink_csv_blocking(download_dir, filepath):
    
    # Chrome options
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    prefs = {"download.default_directory": download_dir}
    options.add_experimental_option("prefs", prefs)

    # Initialize driver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get("https://chartink.com/screener/fii-growth-last-quarter")

        # Wait until the CSV <span> inside the button is clickable
        csv_span = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.XPATH, "//button/span[text()='CSV']"))
        )

        # Click the parent button of the span
        csv_span.find_element(By.XPATH, "..").click()
        print("CSV download clicked!")

        # Wait for download to appear
        downloaded_file = None
        for _ in range(20):  # wait max ~20s
            files = [f for f in os.listdir(download_dir) if f.endswith(".csv")]
            if files:
                downloaded_file = files[0]
                break
            time.sleep(1)

        if downloaded_file:
            # Rename to desired filename
            os.rename(os.path.join(download_dir, downloaded_file), filepath)
            print(f"Downloaded CSV saved as {filepath}")
        else:
            print("Download failed or timed out.")
    finally:
        driver.quit()


async def download_chartink_csv():
    today_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"thisname_{today_str}.csv"

    download_dir = os.path.join(os.getcwd(), "downloads")
    os.makedirs(download_dir, exist_ok=True)
    filepath = os.path.join(download_dir, filename)

    if os.path.exists(filepath):
        print(f"{filename} already exists. Skipping download.")
        return

    return await asyncio.to_thread(download_chartink_csv_blocking,download_dir, filepath)


