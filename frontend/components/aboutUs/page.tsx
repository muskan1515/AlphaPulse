"use client";
import { motion } from "framer-motion";
import { Users, Target, Award } from "lucide-react";
import Image from "next/image";
import MuskanImage from "@/public/images/Muskan_Kushwah.jpeg";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          About Us
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          We are a passionate team dedicated to building innovative solutions
          that drive impact and empower businesses worldwide.
        </p>
      </section>

      {/* Mission / Vision Section */}
      <section className="py-16 px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To revolutionize the way people interact with technology by creating
            AI-powered, scalable, and human-centered applications that solve
            real-world challenges.
          </p>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
          alt="Team working"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gray-50 rounded-2xl shadow text-center"
          >
            <Users className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-600">
              We believe in teamwork and value diverse perspectives to deliver
              the best outcomes.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gray-50 rounded-2xl shadow text-center"
          >
            <Target className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We constantly challenge the status quo and embrace change to
              create meaningful impact.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-gray-50 rounded-2xl shadow text-center"
          >
            <Award className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do and uphold the
              highest standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 md:px-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow text-center w-72"
          >
            <Image
              src={MuskanImage}
              alt="Team member"
              className="w-24 h-24 rounded-full mx-auto mb-4 shadow"
              width={150}
              height={150}
            />
            <h3 className="text-xl font-semibold">Muskan Kushwah</h3>
            <p className="text-gray-500">AI Engineer</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-8 text-center">
        <p className="opacity-90">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
