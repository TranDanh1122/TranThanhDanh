//import Everything from Somewhere
interface WalletBalance {
    currency: string;
    amount: number;
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
  
      const getPriority = (blockchain: any): number => { //blockchain is a string
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
      } //this simple, but maybe we need use memo too, no need to re-render it each time component re-render
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);//balance keep call blockchain property, but it doesnt has it
            if (lhsPriority > -99) { //lhsPriority is not defined
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) { 
              return -1; //no swap
            } else if (rightPriority > leftPriority) {
              return 1; //swap
            }
      });
    }, [balances, prices]);//useMemo will re-caculate when price change, but i dont see anything relate with this here
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row} 
          key={index} /*  using index for key, if we have state or something stored data that might have error 
          if add,edit,delete (re-render list with change index)
          (
          state not save data in component, it just save in somewhere (sorry i dont know where is it)
          React mapped state and component by key, so if you delete item index 2, after list re-render
          item index 3 (now index 2) will have item index 2 state
          that cause we wrong the whole list
          )  */
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted} //error, sortedBalances item doesnt has this property, need use formattedBalances for map here
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }