import { Pin } from '../types';

interface Props {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
}

export function KeywordResultView({ pins, onPinClick }: Props) {
  return (
    <div className="flex flex-col">
      {pins.map((pin) => (
        <button key={pin.id} onClick={() => onPinClick(pin)} className="p-4 border-b hover:bg-gray-50 text-left">
          <div className="font-bold">{pin.title}</div>
          <div className="text-xs text-gray-500 line-clamp-1">{pin.description}</div>
        </button>
      ))}
    </div>
  );
}