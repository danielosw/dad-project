import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import calc from 'postcss-calc';
import postcssOklabFunction from '@csstools/postcss-oklab-function';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
export default {
	plugins: [
		postcssImport(),
		postcssOklabFunction(),
		postcssMixins(),

		postcssPresetEnv({
			stage: 2,
			features: {
				'nesting-rules': true,
			}
		}),
		autoprefixer(),
		calc(),
	]
};