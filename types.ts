// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Product Categories
export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    emoji_icon?: string;
    sort_order?: number;
  };
}

// Products
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    description?: string;
    whats_included?: string;
    price?: number;
    compare_at_price?: number;
    image?: {
      url: string;
      imgix_url: string;
    };
    category?: ProductCategory;
    inventory_status?: string;
    featured?: boolean;
    sort_order?: number;
  };
}

// Product Content Modules (Members Area)
export interface ProductContent extends CosmicObject {
  type: 'product-content';
  metadata: {
    product?: Product | string;
    module_title?: string;
    module_number?: number;
    content?: string;
    summary?: string;
    estimated_time?: number;
  };
}

// Reviews
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_text?: string;
    product?: Product;
    verified_purchase?: boolean;
  };
}

// Blog Posts
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    content?: string;
    excerpt?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    category?: string;
    author_name?: string;
  };
}

// Pages
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    hero_subtitle?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    content?: string;
  };
}

// Homepage
export interface Homepage extends CosmicObject {
  type: 'homepage';
  metadata: {
    hero_tagline?: string;
    hero_subtitle?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    featured_products?: Product[];
    trust_signals?: string;
    about_section_title?: string;
    about_section_content?: string;
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}
