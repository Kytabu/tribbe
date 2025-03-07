
import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

const Chat = () => {
  const { chatId } = useParams();

  return (
    <AppLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-xl font-semibold text-tribbe-lime mb-4">Chat {chatId}</h1>
        <p className="text-tribbe-white/70">This page is under construction.</p>
      </div>
    </AppLayout>
  );
};

export default Chat;
