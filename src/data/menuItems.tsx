import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    category: 'Espresso Bar',
    price: 160,
    description: 'Rich, full-bodied double shot of our house blend.',
    notes: ['Cocoa', 'Toasted sugar'],
    tags: ['Hot', 'Bold', 'Dairy free'],
    badge: 'House dial',
    prepTime: '3 min',
    pairing: 'Almond Croissant',
    intensity: 5,
    image: '/images/menu_espresso.jpg',
    detail:
      'A compact, focused pour with cocoa notes, toasted sugar, and a clean caramel finish. Best for guests who want the coffee itself to stay sharp and expressive.',
    optionGroups: [
      {
        id: 'shot',
        label: 'Shot style',
        choices: [
          { id: 'classic', label: 'Classic double', priceDelta: 0 },
          { id: 'triple', label: 'Triple shot', priceDelta: 60 },
        ],
      },
    ],
  },
  {
    id: 'cortado',
    title: 'Cortado',
    category: 'Espresso Bar',
    price: 190,
    description: 'Equal parts espresso and steamed milk.',
    notes: ['Silky', 'Balanced'],
    tags: ['Hot', 'Milk', 'Balanced'],
    badge: 'Bar favorite',
    prepTime: '4 min',
    pairing: 'Morning Bun',
    intensity: 4,
    image: '/images/menu_cortado.jpg',
    detail:
      'A small glass of espresso softened with silky steamed milk. The texture is creamy, but the drink keeps a direct coffee flavor without becoming sweet or heavy.',
    optionGroups: [
      {
        id: 'milk',
        label: 'Milk',
        choices: [
          { id: 'whole', label: 'Whole milk', priceDelta: 0 },
          { id: 'oat', label: 'Oat milk', priceDelta: 35 },
          { id: 'almond', label: 'Almond milk', priceDelta: 35 },
        ],
      },
    ],
  },
  {
    id: 'latte',
    title: 'Latte',
    category: 'Espresso Bar',
    price: 220,
    description: 'Smooth espresso with perfectly micro-foamed milk.',
    notes: ['Creamy', 'Mellow'],
    tags: ['Hot', 'Milk', 'Smooth'],
    badge: 'Most ordered',
    prepTime: '5 min',
    pairing: 'Berry Tart',
    intensity: 3,
    image: '/images/menu_latte.jpg',
    detail:
      'A generous milk drink built around a double espresso and fine microfoam. It is mellow, balanced, and ideal for slow mornings, laptop sessions, or a soft afternoon reset.',
    optionGroups: [
      {
        id: 'size',
        label: 'Cup size',
        choices: [
          { id: 'regular', label: 'Regular', priceDelta: 0 },
          { id: 'large', label: 'Large', priceDelta: 45 },
        ],
      },
      {
        id: 'milk',
        label: 'Milk',
        choices: [
          { id: 'whole', label: 'Whole milk', priceDelta: 0 },
          { id: 'oat', label: 'Oat milk', priceDelta: 35 },
          { id: 'almond', label: 'Almond milk', priceDelta: 35 },
        ],
      },
    ],
  },
  {
    id: 'pour-over',
    title: 'Pour Over',
    category: 'Espresso Bar',
    price: 260,
    description: 'Single-origin, hand-poured for ultimate clarity.',
    notes: ['Single origin', 'Bright'],
    tags: ['Hot', 'Black', 'Dairy free'],
    badge: 'Slow bar',
    prepTime: '7 min',
    pairing: 'Lemon Loaf',
    intensity: 4,
    image: '/images/menu_pour_over.jpg',
    detail:
      'A hand-brewed cup prepared to highlight the origin, roast, and brightness of each lot. Expect a clean body, aromatic finish, and more nuance than a batch brew.',
    optionGroups: [
      {
        id: 'profile',
        label: 'Brew profile',
        choices: [
          { id: 'balanced', label: 'Balanced', priceDelta: 0 },
          { id: 'bright', label: 'Brighter finish', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    category: 'Espresso Bar',
    price: 240,
    description: 'Slow-steeped coffee served over clear ice.',
    notes: ['Low acidity', 'Chocolate'],
    tags: ['Cold', 'Black', 'Dairy free'],
    badge: 'Warm day pick',
    prepTime: '2 min',
    pairing: 'Avocado Toast',
    intensity: 4,
    image: '/images/cold_brew.png',
    detail:
      'Slow-steeped overnight and served over ice for a round, low-acidity cup. It has deep chocolate notes, a clean finish, and enough strength for a warm day.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'black', label: 'Black over ice', priceDelta: 0 },
          { id: 'splash', label: 'Milk splash', priceDelta: 20 },
          { id: 'tonic', label: 'Coffee tonic', priceDelta: 55 },
        ],
      },
    ],
  },
  {
    id: 'butter-croissant',
    title: 'Butter Croissant',
    category: 'Fresh Pastries',
    price: 180,
    description: 'Classic French style, golden and flaky.',
    notes: ['Laminated', 'Baked today'],
    tags: ['Pastry', 'Vegetarian', 'Baked'],
    badge: 'Fresh batch',
    prepTime: '2 min',
    pairing: 'Espresso',
    intensity: 1,
    image: '/images/menu_butter_croissant.jpg',
    detail:
      'A classic laminated pastry with crisp golden layers and a tender center. We bake it in small batches through the morning so it stays delicate and fragrant.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'room', label: 'Room temperature', priceDelta: 0 },
          { id: 'warm', label: 'Warmed', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'almond-croissant',
    title: 'Almond Croissant',
    category: 'Fresh Pastries',
    price: 230,
    description: 'Twice-baked with almond frangipane.',
    notes: ['Frangipane', 'Toasted almond'],
    tags: ['Pastry', 'Vegetarian', 'Nutty'],
    badge: 'Staff pick',
    prepTime: '2 min',
    pairing: 'Cortado',
    intensity: 2,
    image: '/images/menu_almond_croissant.jpg',
    detail:
      'Twice-baked with almond frangipane, sliced almonds, and a light sugar finish. It is richer than the butter croissant, with toasted edges and a soft center.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'room', label: 'Room temperature', priceDelta: 0 },
          { id: 'warm', label: 'Warmed', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'morning-bun',
    title: 'Morning Bun',
    category: 'Fresh Pastries',
    price: 170,
    description: 'Cinnamon and orange zest infused brioche.',
    notes: ['Cinnamon', 'Orange zest'],
    tags: ['Pastry', 'Vegetarian', 'Spiced'],
    badge: 'Morning only',
    prepTime: '2 min',
    pairing: 'Latte',
    intensity: 1,
    image: '/images/menu_morning_bun.jpg',
    detail:
      'A soft brioche spiral rolled with cinnamon sugar and orange zest. The outside bakes crisp while the center stays tender and aromatic.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'room', label: 'Room temperature', priceDelta: 0 },
          { id: 'warm', label: 'Warmed', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    category: 'Fresh Pastries',
    price: 320,
    description: 'Sourdough, smashed avocado, chili flakes, sea salt.',
    notes: ['Sourdough', 'Savory'],
    tags: ['Savory', 'Vegetarian', 'Meal'],
    badge: 'Brunch plate',
    prepTime: '9 min',
    pairing: 'Cold Brew',
    intensity: 1,
    image: '/images/avocado_toast.png',
    detail:
      'A savory cafe plate served on toasted sourdough with smashed avocado, chili flakes, sea salt, lemon oil, and greens for freshness.',
    optionGroups: [
      {
        id: 'heat',
        label: 'Heat',
        choices: [
          { id: 'mild', label: 'Mild chili', priceDelta: 0 },
          { id: 'extra', label: 'Extra chili', priceDelta: 0 },
        ],
      },
    ],
  },
  {
    id: 'berry-tart',
    title: 'Berry Tart',
    category: 'Dessert Case',
    price: 260,
    description: 'Seasonal berries, vanilla custard, crisp tart shell.',
    notes: ['Vanilla', 'Seasonal fruit'],
    tags: ['Dessert', 'Vegetarian', 'Fruit'],
    badge: 'Limited tray',
    prepTime: '2 min',
    pairing: 'Pour Over',
    intensity: 1,
    image: '/images/menu_berry_tart.jpg',
    detail:
      'A crisp tart shell filled with vanilla custard and seasonal berries. It is bright, lightly sweet, and made for guests who want a fresh dessert.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'chilled', label: 'Chilled', priceDelta: 0 },
          { id: 'boxed', label: 'Boxed to go', priceDelta: 10 },
        ],
      },
    ],
  },
  {
    id: 'lemon-loaf',
    title: 'Lemon Loaf',
    category: 'Dessert Case',
    price: 170,
    description: 'Glazed citrus loaf sliced fresh through the day.',
    notes: ['Citrus', 'Soft crumb'],
    tags: ['Dessert', 'Vegetarian', 'Citrus'],
    badge: 'Coffee pair',
    prepTime: '2 min',
    pairing: 'Espresso',
    intensity: 1,
    image: '/images/dessert_case.png',
    detail:
      'Soft lemon cake with a glossy glaze and clean citrus finish. It pairs well with espresso or cold brew when you want something simple and bright.',
    optionGroups: [
      {
        id: 'serve',
        label: 'Serve',
        choices: [
          { id: 'slice', label: 'Single slice', priceDelta: 0 },
          { id: 'two-slices', label: 'Two slices', priceDelta: 145 },
        ],
      },
    ],
  },
];

export const getMenuItemById = (itemId?: string) => menuItems.find((item) => item.id === itemId);

export const menuTags = [...new Set(menuItems.flatMap((item) => item.tags))].sort();

export const menuCategories = menuItems.reduce<Record<string, MenuItem[]>>((categories, item) => {
  const next = { ...categories };
  next[item.category] = [...(next[item.category] || []), item];
  return next;
}, {});
