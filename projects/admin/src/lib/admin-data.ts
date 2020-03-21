export interface InvoiceItem {
  name: string;
  description: string;
  totalNum: number;
  totalString: string;
  id: number;
}

export interface ClientModel {
  name: string;
  email: string;
  phone: number;
}

export interface InvoiceModel {
  client: ClientModel;
  total: string;
  items: InvoiceItem[];
  sent: boolean;
  paid: boolean;
  dueDate: Date;
  dateSent: Date;
  datePaid: Date;
  _id?: string;
}
