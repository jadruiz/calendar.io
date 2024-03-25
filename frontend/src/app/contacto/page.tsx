"use client";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import useAuth from "../../../hooks/useAuth";

export default function Contacto() {
  useAuth();
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Contacto</h1>
      </main>
      <Footer />
    </>
  );
}
