import type { MenuItem } from '../types';
import { assetPath } from '../utils/assetPath';

export const menuItems: MenuItem[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    category: 'Espresso Bar',
    price: 160,
    description: 'Rich, full-bodied double shot of our house blend.',
    notes: ['Cocoa', 'Toasted sugar'],
    badge: 'House dial',
    prepTime: '3 min',
    pairing: 'Almond Croissant',
    image: assetPath('/images/menu_espresso.jpg'),
    detail:
      'A compact, focused pour with cocoa notes, toasted sugar, and a clean caramel finish. Best for guests who want the coffee itself to stay sharp and expressive.',
  },
  {
    id: 'cortado',
    title: 'Cortado',
    category: 'Espresso Bar',
    price: 190,
    description: 'Equal parts espresso and steamed milk.',
    notes: ['Silky', 'Balanced'],
    badge: 'Bar favorite',
    prepTime: '4 min',
    pairing: 'Morning Bun',
    image: assetPath('/images/menu_cortado.jpg'),
    detail:
      'A small glass of espresso softened with silky steamed milk. The texture is creamy, but the drink keeps a direct coffee flavor without becoming sweet or heavy.',
  },
  {
    id: 'latte',
    title: 'Latte',
    category: 'Espresso Bar',
    price: 220,
    description: 'Smooth espresso with perfectly micro-foamed milk.',
    notes: ['Creamy', 'Mellow'],
    badge: 'Most ordered',
    prepTime: '5 min',
    pairing: 'Berry Tart',
    image: assetPath('/images/menu_latte.jpg'),
    detail:
      'A generous milk drink built around a double espresso and fine microfoam. It is mellow, balanced, and ideal for slow mornings, laptop sessions, or a soft afternoon reset.',
  },
  {
    id: 'pour-over',
    title: 'Pour Over',
    category: 'Espresso Bar',
    price: 260,
    description: 'Single-origin, hand-poured for ultimate clarity.',
    notes: ['Single origin', 'Bright'],
    badge: 'Slow bar',
    prepTime: '7 min',
    pairing: 'Lemon Loaf',
    image: assetPath('/images/menu_pour_over.jpg'),
    detail:
      'A hand-brewed cup prepared to highlight the origin, roast, and brightness of each lot. Expect a clean body, aromatic finish, and more nuance than a batch brew.',
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    category: 'Espresso Bar',
    price: 240,
    description: 'Slow-steeped coffee served over clear ice.',
    notes: ['Low acidity', 'Chocolate'],
    badge: 'Warm day pick',
    prepTime: '2 min',
    pairing: 'Avocado Toast',
    image: assetPath('/images/cold_brew.png'),
    detail:
      'Slow-steeped overnight and served over ice for a round, low-acidity cup. It has deep chocolate notes, a clean finish, and enough strength for a warm day.',
  },
  {
    id: 'butter-croissant',
    title: 'Butter Croissant',
    category: 'Fresh Pastries',
    price: 180,
    description: 'Classic French style, golden and flaky.',
    notes: ['Laminated', 'Baked today'],
    badge: 'Fresh batch',
    prepTime: '2 min',
    pairing: 'Espresso',
    image: assetPath('/images/menu_butter_croissant.jpg'),
    detail:
      'A classic laminated pastry with crisp golden layers and a tender center. We bake it in small batches through the morning so it stays delicate and fragrant.',
  },
  {
    id: 'almond-croissant',
    title: 'Almond Croissant',
    category: 'Fresh Pastries',
    price: 230,
    description: 'Twice-baked with almond frangipane.',
    notes: ['Frangipane', 'Toasted almond'],
    badge: 'Staff pick',
    prepTime: '2 min',
    pairing: 'Cortado',
    image: assetPath('/images/menu_almond_croissant.jpg'),
    detail:
      'Twice-baked with almond frangipane, sliced almonds, and a light sugar finish. It is richer than the butter croissant, with toasted edges and a soft center.',
  },
  {
    id: 'morning-bun',
    title: 'Morning Bun',
    category: 'Fresh Pastries',
    price: 170,
    description: 'Cinnamon and orange zest infused brioche.',
    notes: ['Cinnamon', 'Orange zest'],
    badge: 'Morning only',
    prepTime: '2 min',
    pairing: 'Latte',
    image: assetPath('/images/menu_morning_bun.jpg'),
    detail:
      'A soft brioche spiral rolled with cinnamon sugar and orange zest. The outside bakes crisp while the center stays tender and aromatic.',
  },
  {
    id: 'avocado-toast',
    title: 'Avocado Toast',
    category: 'Fresh Pastries',
    price: 320,
    description: 'Sourdough, smashed avocado, chili flakes, sea salt.',
    notes: ['Sourdough', 'Savory'],
    badge: 'Brunch plate',
    prepTime: '9 min',
    pairing: 'Cold Brew',
    image: assetPath('/images/avocado_toast.png'),
    detail:
      'A savory cafe plate served on toasted sourdough with smashed avocado, chili flakes, sea salt, lemon oil, and greens for freshness.',
  },
  {
    id: 'berry-tart',
    title: 'Berry Tart',
    category: 'Dessert Case',
    price: 260,
    description: 'Seasonal berries, vanilla custard, crisp tart shell.',
    notes: ['Vanilla', 'Seasonal fruit'],
    badge: 'Limited tray',
    prepTime: '2 min',
    pairing: 'Pour Over',
    image: assetPath('/images/menu_berry_tart.jpg'),
    detail:
      'A crisp tart shell filled with vanilla custard and seasonal berries. It is bright, lightly sweet, and made for guests who want a fresh dessert.',
  },
  {
    id: 'lemon-loaf',
    title: 'Lemon Loaf',
    category: 'Dessert Case',
    price: 170,
    description: 'Glazed citrus loaf sliced fresh through the day.',
    notes: ['Citrus', 'Soft crumb'],
    badge: 'Coffee pair',
    prepTime: '2 min',
    pairing: 'Espresso',
    image: assetPath('/images/dessert_case.png'),
    detail:
      'Soft lemon cake with a glossy glaze and clean citrus finish. It pairs well with espresso or cold brew when you want something simple and bright.',
  },
];

export const getMenuItemById = (itemId?: string) => menuItems.find((item) => item.id === itemId);

export const menuCategories = menuItems.reduce<Record<string, MenuItem[]>>((categories, item) => {
  (categories[item.category] ||= []).push(item);
  return categories;
}, {});
