import {
  getTotalPrice,
  getOrdersByQuery,
  GetOrdersSearchNoConditionError,
  GetOrdersSearchItemsCountNegativeError
} from './orders';
import { expect } from '@jest/globals';
import { GetOrdersSearchQueryError, GetOrdersSearchTotalPriceArgIsNegativeError, GetOrdersSearchTotalPriceFormatError } from './shared/orders.models';


    describe('getTotalPrice function', () => {
      it('should return 0 for empty items array', () => {
        const items = [];
        const totalPrice = getTotalPrice(items);
        expect(totalPrice).toBe(0);
      });
  
      it('should calculate total price correctly for an order with one item', () => {
        const items = [{ title: 'item1', pricePerUnit: 10, quantity: 1 }];
        const totalPrice = getTotalPrice(items);
        expect(totalPrice).toBe(10);
      });
      
      it('should return 0 if any item has pricePerUnit or quantity less than or equal to 0', () => {
        const items = [
          { title: 'item1', pricePerUnit: 10, quantity: 0 },
          { title: 'item2', pricePerUnit: 0, quantity: 2 }
        ];
        const totalPrice = getTotalPrice(items);
        expect(totalPrice).toBe(0);
      });
      
    });


    describe('getOrdersByQuery function', () => {

      it('should throw GetOrdersSearchQueryError if search parameter is less than 3 characters long', () => {
        const query = { search: 'ab' };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchQueryError);
      });

      it('should throw GetOrdersSearchTotalPriceArgIsNegativeError if totalPrice eq is negative', () => {
        const query = { totalPrice: { eq: -1, gt: 0, lt: 0 } };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceArgIsNegativeError);
      });
      
      it('should throw GetOrdersSearchNoConditionError if no conditions are provided', () => {
        const query = {};
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchNoConditionError);
      });
  
      it('should throw GetOrdersSearchItemsCountNegativeError if itemsCount is negative', () => {
        const query = { itemsCount: -1 };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchItemsCountNegativeError);
      });


      it('should throw GetOrdersSearchTotalPriceFormatError if totalPrice has wrong format', () => {
        const query = { totalPrice: { eq: 100, gt: 50, lt: 150 } };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceFormatError);
      });

      it('should throw GetOrdersSearchTotalPriceFormatError if totalPrice has wrong format', () => {
        const query = { totalPrice: { eq: 100, gt: 50, lt: 150 } };
        expect(() => getOrdersByQuery(query)).toThrow(GetOrdersSearchTotalPriceFormatError);
      });
 
      it('should filter orders by provided user IDs', () => {
        const query = { userIds: ['A8A9861E-5E73-9F6C-9A47-D3F98C682B5D', '9EDE726B-436E-07EA-528E-61C27AC579B0'] };
        const filteredOrders = getOrdersByQuery(query);
        expect(filteredOrders.length).toBe(2);
      });

      it('should filter orders by partial title match', () => {
        const query = { search: 'blah' };
        const filteredOrders = getOrdersByQuery(query);
        expect(filteredOrders.length).toBe(0);
      });

      it('should filter orders by items count', () => {
        const query = { itemsCount: 5 };
        const filteredOrders = getOrdersByQuery(query);
        expect(filteredOrders.length).toBe(5);
      });
    });
