"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRightLeft, TrendingUp, Info } from "lucide-react";

const RATES: Record<string, number> = {
  EUR: 4.72,
  USD: 4.33,
  GBP: 5.48,
};

const currencyInfo: Record<string, { name: string; symbol: string; flag: string }> = {
  EUR: { name: "Euro", symbol: "\u20AC", flag: "\uD83C\uDDEA\uD83C\uDDFA" },
  USD: { name: "Dolar USA", symbol: "$", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  GBP: { name: "Libra Esterlina", symbol: "\u00A3", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  MYR: { name: "Ringgit Malasio", symbol: "RM", flag: "\uD83C\uDDF2\uD83C\uDDFE" },
};

const quickAmounts = [10, 50, 100, 200, 500, 1000];

const priceReferences = [
  { item: "Comida callejera", price: "5-10 MYR", eur: "1-2 EUR" },
  { item: "Comida en restaurante", price: "15-30 MYR", eur: "3-6 EUR" },
  { item: "Taxi 10km (Grab)", price: "15-25 MYR", eur: "3-5 EUR" },
  { item: "Noche hostel", price: "30-60 MYR", eur: "6-13 EUR" },
  { item: "Noche hotel 3*", price: "120-250 MYR", eur: "25-53 EUR" },
  { item: "Cerveza local", price: "12-18 MYR", eur: "2.5-4 EUR" },
  { item: "Botella agua", price: "1-2 MYR", eur: "0.20-0.40 EUR" },
  { item: "SIM card 30 dias", price: "25-40 MYR", eur: "5-8 EUR" },
];

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [result, setResult] = useState(0);

  const convert = useCallback(() => {
    const val = parseFloat(amount) || 0;
    setResult(val * RATES[fromCurrency]);
  }, [amount, fromCurrency]);

  useEffect(() => {
    convert();
  }, [convert]);

  return (
    <section id="conversor" className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Conversor de Moneda
          </h2>
          <p className="text-gray-500">
            Convierte tu dinero a Ringgit Malasio (MYR)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Converter card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6">
              <ArrowRightLeft className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-gray-800">Calculadora</h3>
            </div>

            {/* From currency */}
            <label className="block text-sm text-gray-500 mb-2">Tu moneda</label>
            <div className="flex gap-2 mb-4">
              {Object.keys(RATES).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setFromCurrency(cur)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    fromCurrency === cur
                      ? "bg-primary text-white shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {currencyInfo[cur].flag} {cur}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <label className="block text-sm text-gray-500 mb-2">Cantidad</label>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                {currencyInfo[fromCurrency].symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                placeholder="0"
              />
            </div>

            {/* Quick amounts */}
            <div className="flex flex-wrap gap-2 mb-6">
              {quickAmounts.map((qa) => (
                <button
                  key={qa}
                  onClick={() => setAmount(String(qa))}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {qa}
                </button>
              ))}
            </div>

            {/* Result */}
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-5 text-white">
              <p className="text-sm text-cyan-200 mb-1">Resultado en Ringgit</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">RM {result.toFixed(2)}</span>
              </div>
              <p className="text-xs text-cyan-200 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                1 {fromCurrency} = {RATES[fromCurrency].toFixed(2)} MYR
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
              <Info className="w-3 h-3" />
              Tasas de cambio aproximadas. Consulta tasas actuales antes de cambiar.
            </p>
          </div>

          {/* Price reference card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">
              Precios de referencia en Malasia
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Para que sepas que esperar en tu presupuesto diario
            </p>
            <div className="space-y-3">
              {priceReferences.map((ref, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-sm text-gray-700">{ref.item}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-800 block">
                      {ref.price}
                    </span>
                    <span className="text-xs text-gray-400">{ref.eur}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-amber-50 rounded-lg p-4 border border-amber-100">
              <p className="text-sm text-amber-800 font-medium mb-1">
                Presupuesto diario estimado
              </p>
              <p className="text-xs text-amber-600">
                Mochilero: 80-120 MYR (17-25 EUR) | Medio: 200-350 MYR (42-74 EUR) | Confort: 500+ MYR (106+ EUR)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
