//import Everything from Somewhere
interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const getPriority = (blockchain: string): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain)
            return balancePriority > -99 && balance.amount <= 0
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain)
            const rightPriority = getPriority(rhs.blockchain)
            return rightPriority - leftPriority
        })
    }, [balances])

    //CHATGPT solution, that not mine, but keep it here because it look better than my solution, i will use it in real work
    // const sortedBalances = useMemo(() => {
    //     return balances.reduce((acc: WalletBalance[], balance) => {
    //         const priority = getPriority[balance.blockchain] ?? -99;

    //         // Filter condition: only add if valid blockchain and amount <= 0
    //         if (priority > -99 && balance.amount <= 0) {
    //             let insertIndex = acc.findIndex(b => getPriority[b.blockchain] < priority);
    //             if (insertIndex === -1) insertIndex = acc.length;
    //             acc.splice(insertIndex, 0, balance);
    //         }
    //         return acc;
    //     }, []);
    // }, [balances]);

    const rows = sortedBalances.map((balance: WalletBalance) => {
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount; //i dont know what in prices, maybe we need some check
        return (
            <WalletRow
                className={classes.row}
                key={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.amount.toFixed()} //just make it simple
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}