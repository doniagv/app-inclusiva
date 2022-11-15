import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import { Hero } from "../components/Hero";

import Loader from "../components/Loader";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
