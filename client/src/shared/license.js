class License { 
  constructor(rule) {
    this._rule = rule;
  }

  calculateDeductible (_prdPurchased){
    let deductible = 0;
    if (this._rule.upgrade_max === undefined || this._rule.upgrade_max === ''){
      // Accumulate Mode
      for(var key in this._rule.upgrade){
        if(_prdPurchased.indexOf(key) >= 0){
          deductible += this._rule.upgrade[key];
        }
      }
    } else {
      // Only-One mode
      console.log('Only-One mode');
      if(_prdPurchased.indexOf(this._rule.upgrade_max) >= 0){
        console.log('Has Max');
        // Force to use specified upgrade rule is applicable
        deductible = this._rule.upgrade[this._rule.upgrade_max] || 0;
      }
      if(deductible === 0){
        console.log('No Max');
        // Looking for the best deal for user
        for(var key in this._rule.upgrade){
          console.log('Loop '+key);
          if(_prdPurchased.indexOf(key) >= 0 && this._rule.upgrade[key] > deductible){
            deductible = this._rule.upgrade[key];
          }
        }
      }
    }
    return deductible;     
  }
  
}

export default License