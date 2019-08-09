import mongoose from '../libs/mongoose/mongoose';

const upgradeRuleSchema = new mongoose.Schema({
  name: String,
  bundle: [String],
  predecessor: [String],
  prerequisite: [String],
  successor: [String],
  upgrade: [{ name: String, deduct: Number }]
});

export default mongoose.model('UpgradeRule', upgradeRuleSchema, 'UpgradeRule');
