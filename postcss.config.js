import postcssPresetEnv from 'postcss-preset-env';
import calc from 'postcss-calc';
import postcssMixins from 'postcss-mixins';
export default {
	plugins: [
		postcssMixins(),

		postcssPresetEnv({
			stage: 2,

		}),
		calc(),
	]
};