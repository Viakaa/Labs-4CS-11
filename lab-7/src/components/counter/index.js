import { useContext } from 'react';
import './style.css';
import GoodsContext from '../../context/goods.context';
import GoodsComponent from '../goods';

const CounterComponent = () => {
  let { selectedGoods, data, addGoods, removeGoods } = useContext(GoodsContext);
  const sum = selectedGoods.reduce((acc, cur) => {
    return acc + cur.cost;
  }, 0);

  function calculateCombinations(fruits) {
    const combinations = new Map([[0, []]]);
  
    for (const fruit of fruits) {
      const newCombinations = new Map();
  
      for (const [totalCost, currentCombo] of combinations) {
        const newCombo = [...currentCombo, fruit];
        const newTotalCost = totalCost + fruit.cost;
  
        if (!combinations.has(newTotalCost)) {
          newCombinations.set(newTotalCost, newCombo);
        }
      }
  
      combinations.forEach((value, key) => newCombinations.set(key, value));
  
      combinations.clear();
      newCombinations.forEach((value, key) => combinations.set(key, value));
    }
  
    return combinations;
  }
  
  function findClosestCost(combinations, targetTotalCost) {
    return [...combinations.keys()]
      .filter((totalCost) => totalCost <= targetTotalCost)
      .reduce((closestTotalCost, totalCost) => (totalCost > closestTotalCost ? totalCost : closestTotalCost), 0);
  }
  
  function selectOptimalFruits(fruits, targetTotalCost) {
    const sortedFruits = [...fruits].sort((a, b) => a.cost - b.cost);
    const combinations = calculateCombinations(sortedFruits);
    const closestTotalCost = findClosestCost(combinations, targetTotalCost);
    return combinations.get(closestTotalCost);
  }
  
  function autoDetect() {
    const selectedFruits = selectOptimalFruits(data, 40);
  
    selectedGoods.forEach(removeGoods);
    selectedGoods = selectedFruits;
    selectedGoods.forEach(addGoods);
  }  

  return (
    <div className='cost-wrapper'>
      <div className='total-cost'>{sum}/40</div>
      <div className='auto-detect' onClick={autoDetect}>
        Auto Detect
      </div>
      <div className='selected-goods'>
        {selectedGoods.map((el) => (
          <GoodsComponent {...el} key={'selected' + el.id} />
        ))}
      </div>
    </div>
  );
};

export default CounterComponent;
