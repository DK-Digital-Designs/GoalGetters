const DEFAULT_NUMBER = '27824656428';

export function whatsappUrl(message: string, number = DEFAULT_NUMBER): string {
  const normalized = number.replace(/[^\d]/g, '');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export const trialMessage =
  'Hi Goal Getters FC, I would like to enquire about booking a trial.';

export const sponsorMessage =
  'Hi Goal Getters FC, I would like to enquire about sponsoring or partnering with the club.';
