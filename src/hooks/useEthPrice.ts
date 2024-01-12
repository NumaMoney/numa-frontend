import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { ethPriceAtom } from '@/lib/atom';

export default function useEthPrice() {
  const [ethPrice, setEthPrice] = useAtom(ethPriceAtom);

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        setEthPrice(response.data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching crypto price:', error);
      }
    };

    // Fetch the initial price
    fetchCryptoPrice();

    // Set up a timer to fetch the price every minute (or as needed)
    const intervalId = setInterval(fetchCryptoPrice, 60000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return ethPrice;
}
