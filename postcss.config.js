import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import calc from 'postcss-calc';
import postcssMixins from '@csstools/postcss-mixins';
export default {
	plugins: [
		autoprefixer(),
		postcssMixins(),
		postcssPresetEnv({
			stage: 3,
			features: { 'nesting-rules': true }
		}),

		calc(),
	]
};