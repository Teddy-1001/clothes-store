import AnnouncmentBanner from '@/components/AnnouncmentBanner';
import Header from '@/components/Header';
import ProductDetails from '@/components/ProductDetails';
import { products } from '@/data/collections'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function ProductPage({params}) {
    const {slug} = await params
    const product = products.find((product)=> product.slug === slug);

    if(!product){
        notFound()
    }
  return (
    <div>
        <AnnouncmentBanner />
        <Header />
        <ProductDetails product={product} />
      
    </div>
  )
}
