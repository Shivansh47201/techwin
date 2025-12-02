"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import RequestQuoteModal from "@/components/quote/RequestQuoteModal";

type RequestQuoteContextType = {
  openModal: () => void;
};

const RequestQuoteContext = createContext<RequestQuoteContextType | undefined>(undefined);

export const RequestQuoteProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <RequestQuoteContext.Provider value={{ openModal }}>
      {children}
      <RequestQuoteModal open={isOpen} onClose={closeModal} />
    </RequestQuoteContext.Provider>
  );
};

export const useRequestQuote = () => {
  const context = useContext(RequestQuoteContext);
  if (context === undefined) {
    throw new Error("useRequestQuote must be used within a RequestQuoteProvider");
  }
  return context;
};
