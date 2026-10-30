import {
  badgeColors,
  getContrastRatio,
  getReadableTextColor,
} from './theme';

describe('contrast helpers', () => {
  test('every badge color meets WCAG AA with its computed text color', () => {
    const failures = Object.entries(badgeColors)
      .map(([label, background]) => ({
        label,
        background,
        text: getReadableTextColor(background),
        ratio: Number(
          getContrastRatio(getReadableTextColor(background), background).toFixed(2)
        ),
      }))
      .filter(({ ratio }) => ratio < 4.5);

    expect(failures).toEqual([]);
  });

  test('picks black on light backgrounds and white on dark ones', () => {
    expect(getReadableTextColor('#61DAFB')).toBe('#000000');
    expect(getReadableTextColor('#000000')).toBe('#ffffff');
    expect(getReadableTextColor('#003B57')).toBe('#ffffff');
  });

  test('always reaches AA for normal text, even on mid-grey', () => {
    const greys = ['#000000', '#595959', '#6b6b6b', '#757575', '#8a8a8a', '#ffffff'];

    greys.forEach((background) => {
      expect(
        getContrastRatio(getReadableTextColor(background), background)
      ).toBeGreaterThanOrEqual(4.5);
    });
  });

  test('computes known contrast ratios', () => {
    expect(getContrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1);
    expect(getContrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 2);
  });
});
