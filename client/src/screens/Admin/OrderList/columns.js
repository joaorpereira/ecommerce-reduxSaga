export const columns = [
  {
    Header: 'Id',
    accessor: 'id',
    sortType: 'basic',
    show: true,
  },
  {
    Header: 'User Name',
    accessor: 'userName',
    sortType: 'basic',
    show: true,
  },
  // {
  //   Header: 'Order',
  //   accessor: 'order',
  //   sortType: 'basic',
  //   show: true,
  // },
  // {
  //   Header: 'Address',
  //   accessor: 'shippingAddress',
  //   sortType: 'basic',
  //   show: true,
  // },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    sortType: 'basic',
    show: true,
  },
  {
    Header: 'Delivered At',
    accessor: 'deliveredAt',
    sortType: 'basic',
    show: true,
  },
  {
    Header: 'Total',
    accessor: 'totalPrice',
    sortType: 'basic',
    show: true,
  },
  {
    Header: 'Delivered',
    accessor: 'isDelivered',
    sortType: 'basic',
    show: true,
  },
  {
    Header: 'Paid',
    accessor: 'isPaid',
    sortType: 'basic',
    show: true,
  },
]
