export const env = {
  get paystackSecretKey() {
    const key = process.env.PAYSTACK_SECRET_KEY;
    if (!key && process.env.NODE_ENV !== 'test') {
      console.warn('Warning: PAYSTACK_SECRET_KEY is not defined in the environment.');
    }
    return key || '';
  },
  get paystackPublicKey() {
    const key = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
    if (!key && process.env.NODE_ENV !== 'test') {
      console.warn('Warning: NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY is not defined in the environment.');
    }
    return key || '';
  }
};
