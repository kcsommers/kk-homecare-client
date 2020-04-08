import { HttpResponse } from '@kk/core';
import { MomentInput } from 'moment';

export interface InvoiceItem {
  name: string;
  description: string;
  totalNum: number;
  totalString: string;
  itemId: number;
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
  dueDate: MomentInput;
  dateSent: MomentInput;
  datePaid: MomentInput;
  _id?: string;
}

export interface InvoiceResponse extends HttpResponse {
  data: {
    invoices: InvoiceModel[],
    total?: number;
  }
}

export interface MessageModel {
  client: ClientModel,
  message: string,
  jobType: string,
  replied: boolean,
  date: MomentInput;
  _id: string;
}

export interface MessageResponse extends HttpResponse {
  data: {
    messages: MessageModel[],
    total?: number;
  }
}
