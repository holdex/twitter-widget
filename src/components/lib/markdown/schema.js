// Default schema: https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
import { defaultSchema } from 'hast-util-sanitize/lib/schema';


defaultSchema.tagNames.push('video', 'source');

// Allow className for all elements
defaultSchema.attributes['*'].push('className');

// Allow specific attributes that are required for the page to render properly
defaultSchema.attributes['div'] = ['dataType', 'dataId'];
defaultSchema.attributes['blockquote'] = ['dataId'];
defaultSchema.attributes['img'] = ['dataType', 'src', 'height', 'width'];
defaultSchema.attributes['video'] = [
    'poster',
    'controls',
    'preload',
    'playsInline',
    'autoPlay',
    'muted',
    'loop',
];
defaultSchema.attributes['source'] = ['src'];

export default defaultSchema;