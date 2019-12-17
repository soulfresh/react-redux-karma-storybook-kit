import React from 'react';
import { storiesOf } from '@storybook/react';
import { chapters } from './storybook-chapters';

const buttonStyles = {
  'margin': '10px',
};

const variations = ['Standard', 'Primary', 'Secondary', 'Success', 'Warn', 'Error'];

storiesOf(chapters.BUTTONS, module)
  .addWithChapters('1. Buttons & Links', {
    info: 'Standard HTML button and link elements.',
    chapters: [{
      title: 'Buttons',
      sections: [{
        title: 'Buttons',
        sectionFn: () => (
          variations.map((v) => (
            <button className={v.toLowerCase()} style={buttonStyles} type="button" key={v}>
              { v } Text Button
            </button>
          ))
        )
      }, {
        title: 'Focused Buttons',
        subtitle: 'These should all look the same',
        sectionFn: () => (
          variations.map((v) => (
            <button className={`${v.toLowerCase()} focused`} style={buttonStyles} type="button" key={v}>
              { v } Text Button
            </button>
          ))
        )
      }, {
        title: 'Disabled Buttons',
        subtitle: 'The disabled state for all buttons.',
        sectionFn: () => (
          variations.map((v) => (
            <button className={v.toLowerCase()} style={buttonStyles} type="button" disabled key={v}>
              { v } Text Button
            </button>
          ))
        )
      }]
    }, {
      title: 'Transparent Button',
      sections: [{
        subtitle: 'You can also make any button have a transparent background.',
        sectionFn: () => (
          <>
            <button className="transparent" style={buttonStyles}>
              Transparent Button
            </button>
            <button className="transparent" disabled style={buttonStyles}>
              Disabled Transparent Button
            </button>
            <button className="transparent primary" style={buttonStyles}>
              Primary Transparent Button
            </button>
            <button className="transparent success" style={buttonStyles}>
              Success Transparent Button
            </button>
            <button className="transparent warn" style={buttonStyles}>
              Warn Transparent Button
            </button>
            <button className="transparent error" style={buttonStyles}>
              Error Transparent Button
            </button>
          </>
        )
      }]
    }, {
      title: 'Button as Link',
      sections: [{
        subtitle: 'You can also make any button look like a link.',
        sectionFn: () => (
          variations.map((v) => (
            <button className={ `link ${v.toLowerCase()}` } key={v}>
              { v } Button as a Text Link
            </button>
          ))
        )
      }, {
        title: 'Focused',
        subtitle: 'These should all look the same',
        sectionFn: () => (
          variations.map((v) => (
            <button className={ `link ${v.toLowerCase()} focused` } key={v}>
              { v } Button as a Text Link
            </button>
          ))
        )
      }, {
        title: 'Disabled',
        subtitle: 'The disabled state for all buttons.',
        sectionFn: () => (
          variations.map((v) => (
            <button className={ `link ${v.toLowerCase()}` } disabled key={v}>
              { v } Button as a Text Link
            </button>
          ))
        )
      }]
    }, {
      title: 'Links',
      sections: [{
        title: 'Default Link',
        sectionFn: () => (
          variations.map(v => (
            <a className={v.toLowerCase()} href="/" target="blank" key={v}>
              {v} Standard Text Link
            </a>
          ))
        )
      }, {
        title: 'Focused',
        subtitle: 'These should all look the same',
        sectionFn: () => (
          variations.map(v => (
            <a className={`${v.toLowerCase()} focused`} href="/" target="blank" key={v}>
              {v} Standard Text Link
            </a>
          ))
        )
      }, {
        title: 'Disabled',
        subtitle: 'The disabled state for all buttons.',
        sectionFn: () => (
          variations.map(v => (
            <a className={v.toLowerCase()} href="/" target="blank" disabled key={v}>
              {v} Standard Text Link
            </a>
          ))
        )
      }]
    }, {
      title: 'Link as Button',
      subtitle: 'You can also make a link look like a button.',
      sections: [{
        sectionFn: () => (
          variations.map(v => (
            <a className={`button ${v.toLowerCase()}`} style={buttonStyles} href="/" target="blank" key={v}>
              { v } Text Link as a Button
            </a>
          ))
        )
      }, {
        title: 'Focused',
        subtitle: 'These should all look the same',
        sectionFn: () => (
          variations.map(v => (
            <a className={`button ${v.toLowerCase()} focused`} style={buttonStyles} href="/" target="blank" key={v}>
              { v } Text Link as a Button
            </a>
          ))
        )
      }, {
        title: 'Disabled',
        subtitle: 'The disabled state for all buttons.',
        sectionFn: () => (
          variations.map(v => (
            <a className={`button ${v.toLowerCase()}`} style={buttonStyles} href="/" target="blank" disabled key={v}>
              { v } Text Link as a Button
            </a>
          ))
        )
      }]
    }]
  });

storiesOf(chapters.TEXT, module)
  .addWithChapters('1. Titles & Text', {
    info: 'Use default heading elements for page titles.',
    chapters: [{
      sections: [{
        sectionFn: () => (
          <React.Fragment>
            <h1>H1 Title</h1>
            <h2>H2 Sub Title Light</h2>
            <h3>H3 Sub Title Heavy</h3>
            <h4>H4 Sub Title</h4>
            <h5>H5 Tiny Title</h5>
            <h6>H6 Tiny Title</h6>
          </React.Fragment>
        )
      }]
    }]
  });

const levels = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const colors = ['Primary', 'Secondary', 'Grayscale', 'Success', 'Warn', 'Error'];
const foreground = [
  'opaque',
  'default',
  'text',
  'light',
  'faded',
  'disabled',
  'divider',
  'border',
  'focus',
  'active',
];
const background = [
  'default',
  'shaded',
  'hover',
  'overlay',
  'fade',
  'focus',
  'active',
];

storiesOf(chapters.COLORS, module)
  .addWithChapters('Colors', {
    chapters: [{
      sections: [{
        title: 'Standard Palettes',
        sectionFn: () => (
          colors.map((palette) => (
            <div className={`color-palette ${palette.toLowerCase()}`} key={palette}>
              <h2>{ palette }</h2>
              <div className="values">
                { levels.map((hue) => (
                  <div className={`color hue-${hue}`} key={hue}>
                    <h5>{ hue }</h5>
                  </div>
                ))}
              </div>
            </div>
          ))
        )
      }, {
        title: 'Foreground Palettes',
        sectionFn: () => (
          ['Foreground', 'Foreground Dark'].map((palette) => (
            <div className={`color-palette ${palette.toLowerCase()}`} key={palette}>
              <h2>{ palette }</h2>
              <div className="values">
                { foreground.map((hue) => (
                  <div className={`color hue-${hue}`} key={hue}>
                    <h5>{ hue }</h5>
                  </div>
                ))}
              </div>
            </div>
          ))
        )
      }, {
        title: 'Background Palettes',
        sectionFn: () => (
          ['Background', 'Background Dark'].map((palette) => (
            <div className={`color-palette ${palette.toLowerCase()}`} key={palette}>
              <h2>{ palette }</h2>
              <div className="values">
                { background.map((hue) => (
                  <div className={`color hue-${hue}`} key={hue}>
                    <h5>{ hue }</h5>
                  </div>
                ))}
              </div>
            </div>
          ))
        )
      }]
    }]
  });
