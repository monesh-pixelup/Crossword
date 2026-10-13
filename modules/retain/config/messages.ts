/** A product attached under a message in the phone mock-up. */
export type MessageAttachment = { name: string; meta: string; price?: string };

/** One outbound message as the shopper receives it: when it arrives, what it says, what it shows. */
export type OutboundMessage = {
  /** Shown above the message, as the phone's timestamp line. */
  when: string;
  text: string;
  attachment?: MessageAttachment;
};
