import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import calc from 'postcss-calc';
export default {
	plugins: [
		autoprefixer(),
		postcssPresetEnv({
			stage: 3,
			features: { 'nesting-rules': true }
		}),
		calc()
	]
};