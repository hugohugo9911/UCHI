import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export default function PropertySwipeApp() {
  const [role, setRole] = useState(null);
  const [buyerPreferences, setBuyerPreferences] = useState({});
  const [sellerListing, setSellerListing] = useState({});
  const [properties, setProperties] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/400",
      title: "Cozy Beach House",
      price: "$500,000",
      description: "A lovely beachside retreat."
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400",
      title: "Downtown Apartment",
      price: "$300,000",
      description: "Modern living in the city center."
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setMatches([...matches, properties[currentIndex]]);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const renderBuyerForm = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Buyer Preferences</h2>
      <Input placeholder="Location" onChange={(e) => setBuyerPreferences({ ...buyerPreferences, location: e.target.value })} />
      <Input placeholder="Budget" onChange={(e) => setBuyerPreferences({ ...buyerPreferences, budget: e.target.value })} />
      <Input placeholder="Number of Bedrooms" onChange={(e) => setBuyerPreferences({ ...buyerPreferences, bedrooms: e.target.value })} />
      {currentIndex < properties.length ? (
        <motion.div initial={{ x: 0 }} animate={{ x: 0 }} className="mt-4">
          <Card className="w-full max-w-md mx-auto">
            <CardContent className="p-4 space-y-2">
              <img src={properties[currentIndex].image} alt="property" className="w-full h-48 object-cover rounded" />
              <h3 className="text-lg font-semibold">{properties[currentIndex].title}</h3>
              <p>{properties[currentIndex].price}</p>
              <p>{properties[currentIndex].description}</p>
              <div className="flex justify-between pt-2">
                <Button onClick={() => handleSwipe("left")}>Skip</Button>
                <Button onClick={() => handleSwipe("right")}>Interested</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <p className="text-center">No more properties to view.</p>
      )}
    </div>
  );

  const renderSellerForm = () => (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">List Your Property</h2>
      <Input placeholder="Title" onChange={(e) => setSellerListing({ ...sellerListing, title: e.target.value })} />
      <Input placeholder="Price" onChange={(e) => setSellerListing({ ...sellerListing, price: e.target.value })} />
      <Input placeholder="Image URL" onChange={(e) => setSellerListing({ ...sellerListing, image: e.target.value })} />
      <Textarea placeholder="Description" onChange={(e) => setSellerListing({ ...sellerListing, description: e.target.value })} />
      <Button onClick={() => alert("Property listed!")}>Submit Listing</Button>
    </div>
  );

  if (!role) {
    return (
      <div className="p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Welcome to PropertySwipe</h1>
        <p className="text-gray-600">Are you a buyer or a seller?</p>
        <div className="flex justify-center space-x-4">
          <Button onClick={() => setRole("buyer")}>I'm a Buyer</Button>
          <Button onClick={() => setRole("seller")}>I'm a Seller</Button>
        </div>
      </div>
    );
  }

  return role === "buyer" ? renderBuyerForm() : renderSellerForm();
}

