export class CreateAddressDto {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;       // <-- agregado
  customerId?: number;   // <-- agregado (opcional, por si no siempre hay customer)
}
