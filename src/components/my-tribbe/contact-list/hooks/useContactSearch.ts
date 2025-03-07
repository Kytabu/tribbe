
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

export function useContactSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    { id: "1", name: "Alice Smith", phone: "+254 712 345 678", image: "/lovable-uploads/a5a73b4a-8203-4833-8bd4-842288944144.png" },
    { id: "2", name: "Bob Johnson", phone: "+254 723 456 789", image: "/lovable-uploads/a66bb083-0a55-45b2-9fbb-b899fee07494.png" },
    { id: "3", name: "Carol Williams", phone: "+254 734 567 890", image: "/lovable-uploads/aa757ca5-a282-4eac-9369-b740b480634b.png" },
    { id: "4", name: "David Brown", phone: "+254 745 678 901", image: "/lovable-uploads/b145f32d-c53a-4dfd-bc4f-c501335741ab.png" },
    { id: "5", name: "Eva Davis", phone: "+254 756 789 012", image: "/lovable-uploads/bf878166-6407-457b-ac97-59a01d4a528b.png" },
    { id: "6", name: "Frank Miller", phone: "+254 767 890 123", image: "/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png" },
    { id: "7", name: "Grace Taylor", phone: "+254 778 901 234", image: "/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png" },
    { id: "8", name: "Henry Wilson", phone: "+254 789 012 345", image: "/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png" }
  ];

  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    contacts,
    filteredContacts,
    searchQuery,
    setSearchQuery
  };
}
