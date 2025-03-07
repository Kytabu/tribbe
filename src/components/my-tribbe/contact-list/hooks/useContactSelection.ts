
import { useState } from "react";

export function useContactSelection(
  selectedContacts: string[],
  setSelectedContacts: (contacts: string[]) => void
) {
  const toggleContactSelection = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  return {
    toggleContactSelection
  };
}
