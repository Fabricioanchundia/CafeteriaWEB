interface Props {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
}

export default function CheckoutItem({ item }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-xs text-gray-500">
          Cantidad: {item.quantity}
        </p>
      </div>

      <p className="font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}
