import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Subscript, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import type { PricingCardProps } from '../../types';
import { createCheckoutSession } from '../../services/SubscriptionService';
export function PricingCard({ id,title, price, billingCycle, description, features, limitations = [], buttonText, popular }: PricingCardProps) {

  const userid = useSelector((state: any) => state.auth.user.id);
  const handleSubscribe = async (priceId: string) => {

    if (price === "Free") {
      window.location.href = "/dashboard";
      return;
    }
  
    const url = await createCheckoutSession(priceId);
    console.log(url,'url')
    window.location.href = url;
  };
  return (
   
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      className={`p-8 rounded-xl flex flex-col h-full ${
        popular
          ? 'bg-white shadow-xl ring-2 ring-indigo-600 scale-105'
          : 'bg-white shadow-md hover:shadow-xl'
      }`}
    >
      {popular && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
        >
          Most Popular
        </motion.span>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{title}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {price !== 'Custom' && <span className="ml-1 text-gray-600">/{billingCycle}</span>}
      </div>
      <p className="mt-2 text-gray-600">{description}</p>

      <motion.ul className="mt-6 space-y-3 flex-grow">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </motion.li>
        ))}
        {limitations.map((limitation, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (features.length + index) * 0.1 }}
            className="flex items-center text-gray-400"
          >
            <XCircle className="h-5 w-5 text-gray-400 mr-2" />
            <span>{limitation}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          popular
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'
            : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
        }`}
        onClick={() => handleSubscribe(id)}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}