import { transaction } from '../types/Transaction'


export default function TransactionList({transactions} : {transactions : transaction[]}) {
    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-4 h-auto min-h-screen/2 overflow-x-auto">
    <h1 className="text-2xl font-bold mb-4">Transactions</h1>
    <table className="table-auto min-w-full">
        <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Transaction Id</th>
                <th className="py-3 px-6 text-left">Amount</th>
                <th className="py-3 px-6 text-left">From</th>
                <th className="py-3 px-6 text-left">To</th>
            </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
            {transactions.map((transaction) => {
                return (
                    <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left">{transaction.id}</td>
                        <td className="py-3 px-6 text-left">{transaction.amount}</td>
                        <td className="py-3 px-6 text-left">{transaction.sender.name}</td>
                        <td className="py-3 px-6 text-left">{transaction.receiver.name}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
</div>
    )
}
