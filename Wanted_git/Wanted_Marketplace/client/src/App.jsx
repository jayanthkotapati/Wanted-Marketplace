import React, { useMemo, useState } from 'react';
import {
  Search, MapPin, ShoppingBag, UserRound, Menu, ChevronRight, Star,
  Clock3, Truck, ShieldCheck, Store, Utensils, Leaf, Package, Plus,
  Minus, X, Bike, ArrowRight, Heart, SlidersHorizontal
} from 'lucide-react';

const categories = [
  { name: 'All', icon: '✨' }, { name: 'Groceries', icon: '🥬' },
  { name: 'Restaurants', icon: '🍜' }, { name: 'Quick essentials', icon: '⚡' },
  { name: 'Fresh produce', icon: '🍎' }, { name: 'Home & care', icon: '🧴' },
  { name: 'Bakery', icon: '🥐' }, { name: 'Pharmacy*', icon: '🩹' }
];

const initialProducts = [
  {id:'p1',name:'Farm fresh tomatoes',brand:'Local harvest',category:'Fresh produce',type:'grocery',price:32,oldPrice:40,unit:'500 g',rating:4.7,eta:'18–25 min',shop:'Green Basket Market',emoji:'🍅',color:'peach',badge:'Fresh today'},
  {id:'p2',name:'Whole milk',brand:'Daily Dairy',category:'Groceries',type:'grocery',price: thirtyFive(),unit:'1 L',rating:4.6,eta:'15–22 min',shop:'Green Basket Market',emoji:'🥛',color:'blue'},
  {id:'p3',name:'Masala dosa',brand:'South Street Kitchen',category:'Restaurants',type:'food',price:89,oldPrice:110,unit:'1 plate',rating:4.8,eta:'25–35 min',shop:'South Street Kitchen',emoji:'🥞',color:'sand',badge:'Bestseller'},
  {id:'p4',name:'Classic cheeseburger',brand:'Grill House',category:'Restaurants',type:'food',price:149,unit:'1 item',rating:4.5,eta:'20–30 min',shop:'Grill House',emoji:'🍔',color:'peach'},
  {id:'p5',name:'Bananas',brand:'Local harvest',category:'Fresh produce',type:'grocery',price:45,unit:'6 pcs',rating:4.7,eta:'18–25 min',shop:'Green Basket Market',emoji:'🍌',color:'yellow'},
  {id:'p6',name:'Potato chips',brand:'Crunch time',category:'Quick essentials',type:'grocery',price:20,unit:'1 pack',rating:4.4,eta:'10–18 min',shop:'Corner Express',emoji:'🍟',color:'sand'},
  {id:'p7',name:'Sourdough loaf',brand:'Daily Crumb Bakery',category:'Bakery',type:'grocery',price:120,unit:'1 loaf',rating:4.9,eta:'22–30 min',shop:'Daily Crumb Bakery',emoji:'🍞',color:'brown'},
  {id:'p8',name:'Dishwashing liquid',brand:'Home basics',category:'Home & care',type:'grocery',price:99,oldPrice:120,unit:'500 ml',rating:4.3,eta:'20–30 min',shop:'Corner Express',emoji:'🧼',color:'blue'},
  {id:'p9',name:'Paneer tikka bowl',brand:'Curry Leaf',category:'Restaurants',type:'food',price:189,unit:'1 bowl',rating:4.6,eta:'25–40 min',shop:'Curry Leaf',emoji:'🍛',color:'sand'},
  {id:'p10',name:'Fresh orange juice',brand:'Juice Junction',category:'Restaurants',type:'food',price:79,unit:'300 ml',rating:4.5,eta:'15–25 min',shop:'Juice Junction',emoji:'🍊',color:'peach'},
  {id:'p11',name:'Eggs',brand:'Happy Hens',category:'Groceries',type:'grocery',price:72,unit:'6 pcs',rating:4.5,eta:'18–25 min',shop:'Green Basket Market',emoji:'🥚',color:'yellow'},
  {id:'p12',name:'Chocolate brownie',brand:'Daily Crumb Bakery',category:'Bakery',type:'food',price:65,unit:'1 piece',rating:4.8,eta:'20–30 min',shop:'Daily Crumb Bakery',emoji:'🍫',color:'brown'}
];
function thirtyFive(){ return 35; }

const money = (n) => `₹${n.toFixed(0)}`;

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [role, setRole] = useState('Customer');
  const [showRole, setShowRole] = useState(false);
  const [toast, setToast] = useState('');
  const [sort, setSort] = useState('recommended');
  const [saved, setSaved] = useState([]);
  const [entry, setEntry] = useState('');
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const products = useMemo(() => {
    let list = initialProducts.filter(p => {
      const categoryMatch = activeCategory === 'All' ||
        (activeCategory === 'Groceries' && ['Groceries','Fresh produce','Quick essentials','Home & care'].includes(p.category)) ||
        p.category === activeCategory;
      const query = search.toLowerCase();
      return categoryMatch && (!query || `${p.name} ${p.brand} ${p.shop} ${p.category}`.toLowerCase().includes(query));
    });
    if (sort === 'price-low') list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === 'rating') list = [...list].sort((a,b)=>b.rating-a.rating);
    return list;
  }, [activeCategory, search, sort]);

  const cartItems = Object.entries(cart).map(([id, qty]) => ({...initialProducts.find(p=>p.id===id), qty})).filter(p=>p.id);
  const itemCount = cartItems.reduce((s,p)=>s+p.qty,0);
  const subtotal = cartItems.reduce((s,p)=>s+p.price*p.qty,0);
  const add = (p) => { setCart(c=>({...c,[p.id]:(c[p.id]||0)+1})); setToast(`${p.name} added to your bag`); setTimeout(()=>setToast(''),1800); };
  const change = (id, delta) => setCart(c=>{const next={...c}; const n=(next[id]||0)+delta; if(n<=0) delete next[id]; else next[id]=n; return next;});
  const toggleSaved = (id) => setSaved(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
  const checkout = () => { setToast('Demo checkout: connect a payment provider to accept real payments.'); setTimeout(()=>setToast(''),3000); };

  if (!entry) return <div className="entry-screen"><div className="entry-brand"><span className="detective-logo">🕵️</span><div><strong>Wanted<span>.</span></strong><small>EVERYTHING YOU NEED. ONE APP.</small></div></div><div className="entry-card"><div className="eyebrow">WELCOME TO WANTED</div><h1>How would you like<br/><em>to get started?</em></h1><p>Choose your space to continue.</p><div className="role-options"><button onClick={()=>{setEntry('customer');setRole('Customer')}}><span>🛍️</span><div><strong>Customer</strong><small>Shop, order and track</small></div><ChevronRight/></button><button onClick={()=>{setEntry('supplier');setRole('Supplier')}}><span>🏪</span><div><strong>Supplier</strong><small>Manage products and supply orders</small></div><ChevronRight/></button><button onClick={()=>{setEntry('delivery');setRole('Delivery partner')}}><span>🛵</span><div><strong>Delivery</strong><small>Accept deliveries and view earnings</small></div><ChevronRight/></button></div><small className="entry-note">Customers can continue without signing in. Supplier and delivery access requires an account.</small></div><div className="entry-footer">LOCAL SHOPS · FOOD · GROCERIES · DELIVERY</div></div>;

  if (entry === 'supplier' || entry === 'delivery') {
    const title = entry === 'supplier' ? 'Supplier' : 'Delivery Partner';
    const demoId = entry === 'supplier' ? 'supplier-demo' : 'delivery-demo';
    const demoPass = 'WantedDemo123!';
    const submitLogin = (e) => { e.preventDefault(); if (loginId === demoId && loginPassword === demoPass) setEntry(entry + '-dashboard'); else setLoginError('Demo login not recognised. Use the demo credentials shown below.'); };
    return <div className="entry-screen"><div className="entry-brand"><span className="detective-logo">🕵️</span><div><strong>Wanted<span>.</span></strong><small>EVERYTHING YOU NEED. ONE APP.</small></div></div><div className="entry-card login-card"><button className="back-link" onClick={()=>{setEntry('');setLoginError('')}}>← Back to role selection</button><div className="login-emblem">{entry==='supplier'?'🏪':'🛵'}</div><h1>{title} <em>Login</em></h1><p>Sign in to open your dashboard.</p><form onSubmit={submitLogin}><label>User ID<input value={loginId} onChange={e=>setLoginId(e.target.value)} required autoComplete="username" placeholder="Enter your user ID"/></label><label>Password<input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password"/></label>{loginError&&<div className="login-error">{loginError}</div>}<button className="primary-button login-submit" type="submit">Login <ArrowRight size={16}/></button></form><div className="demo-credentials"><strong>Local demo credentials</strong><span>User ID: <code>{demoId}</code></span><span>Password: <code>{demoPass}</code></span><small>Demo only — replace with secure server-side authentication before deployment.</small></div></div><div className="entry-footer">BLUE FOR TRUST · BROWN FOR COMMUNITY</div></div>;
  }

  if (entry.endsWith('-dashboard')) {
    const supplier = entry === 'supplier-dashboard';
    const title = supplier ? 'Supplier Dashboard' : 'Delivery Partner Dashboard';
    const tiles = supplier ? [['📦','Products','Manage your catalogue'],['🧾','Supply orders','Review retailer orders'],['📊','Sales summary','Track sales and payouts'],['🏬','Retail partners','Manage shop relationships']] : [['🛵','Available deliveries','Review delivery requests'],['📍','Navigation','Pickup and drop-off details'],['💰','Earnings','Review completed jobs'],['🛡️','Safety & support','Get help during deliveries']];
    return <div className="dashboard-shell"><header className="dashboard-top"><div className="entry-brand"><span className="detective-logo">🕵️</span><div><strong>Wanted<span>.</span></strong><small>{title.toUpperCase()}</small></div></div><button className="text-button" onClick={()=>{setEntry('');setLoginId('');setLoginPassword('')}}>Sign out ↗</button></header><main className="dashboard-main"><div className="eyebrow">WELCOME BACK</div><h1>{title.split(' ')[0]} <em>workspace.</em></h1><p>{supplier?'Manage products, retailer orders and your supply business.':'Manage delivery requests, routes and your earnings.'}</p><div className="dashboard-stats"><div><small>{supplier?'Open supply orders':'Deliveries today'}</small><strong>{supplier?'12':'8'}</strong></div><div><small>{supplier?'Sales this month':'Estimated earnings'}</small><strong>{supplier?'₹1,25,000':'₹1,240'}</strong></div><div><small>Account status</small><strong className="status-online">● Demo active</strong></div></div><div className="dashboard-tiles">{tiles.map(([icon,name,desc])=><button key={name} onClick={()=>setToast(`${name} module is a prototype placeholder.`)}><span>{icon}</span><strong>{name}</strong><small>{desc}</small><ChevronRight/></button>)}</div><div className="dashboard-warning">This is a dashboard prototype. Connect authenticated APIs and verified business data before using it operationally.</div><button className="primary-button" onClick={()=>{setEntry('');setLoginId('');setLoginPassword('')}}>Return to role selection</button></main></div>;
  }

  return <div className="app-shell">
    <div className="announcement"><span>WANTED CITY LAUNCH</span> Your neighbourhood, all in one place <span className="announcement-right">Fast delivery · Local favourites</span></div>
    <header className="topbar">
      <button className="mobile-menu icon-button" aria-label="Menu"><Menu size={21}/></button>
      <a className="brand" href="#" aria-label="Wanted home"><span className="brand-mark">W</span><span>Wanted<span className="brand-dot">.</span><small>EVERYTHING, NEARBY</small></span></a>
      <button className="location-pill"><MapPin size={18}/><span><small>DELIVER TO</small><strong>Choose your location</strong></span><ChevronRight size={16}/></button>
      <label className="searchbox"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search groceries, dishes, shops..." /><kbd>⌘ K</kbd></label>
      <div className="header-actions">
        <div className="role-wrap"><button className="account-button" onClick={()=>setShowRole(!showRole)}><UserRound size={19}/><span>{role}<small>Account</small></span></button>
        {showRole && <div className="role-menu">{['Customer','Shop partner','Supplier','Delivery partner','Admin'].map(r=><button key={r} onClick={()=>{setRole(r);setShowRole(false);setToast(`${r} preview selected`);setTimeout(()=>setToast(''),1800)}}>{r}</button>)}</div>}</div>
        <button className="cart-button" onClick={()=>setShowCart(true)}><ShoppingBag size={19}/><span>Bag</span>{itemCount>0&&<b>{itemCount}</b>}</button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR CITY. YOUR CHOICE.</div>
          <h1>Everything you need.<br/><em>Right around you.</em></h1>
          <p>Groceries, great food, everyday essentials and local favourites — all wanted, all in one place.</p>
          <div className="hero-buttons"><button className="primary-button" onClick={()=>document.getElementById('discover')?.scrollIntoView({behavior:'smooth'})}>Explore the marketplace <ArrowRight size={17}/></button><button className="text-button" onClick={()=>{setRole('Shop partner');setToast('Shop partner preview selected');setTimeout(()=>setToast(''),1800)}}>Partner with us <ChevronRight size={17}/></button></div>
          <div className="hero-proof"><div className="proof-avatars"><span>🥬</span><span>🍜</span><span>🥐</span></div><div><strong>Local first. Always.</strong><small>Discover the shops that make your neighbourhood.</small></div></div>
        </div>
        <div className="hero-art" aria-label="Illustration of groceries and food"><div className="art-orbit orbit-one"></div><div className="art-orbit orbit-two"></div><div className="art-card art-card-top"><span>🥑</span><div><strong>Fresh picks</strong><small>From nearby shops</small></div><span className="tiny-check">✓</span></div><div className="food-bowl">🥗</div><div className="art-card art-card-bottom"><span className="delivery-icon">🛵</span><div><strong>On its way!</strong><small>Track every step</small></div><span className="live-dot"></span></div><div className="art-sticker">GOOD<br/>THINGS<br/><b>NEARBY</b></div></div>
        <div className="hero-bottom-note"><span>01</span><span className="note-line"></span><span>SHOP LOCAL, LIVE WELL</span></div>
      </section>

      <section className="benefits">
        <div><span className="benefit-icon"><Truck size={20}/></span><span><strong>Delivery that fits your day</strong><small>See live status and estimated arrival</small></span></div>
        <div><span className="benefit-icon"><ShieldCheck size={20}/></span><span><strong>Payments with peace of mind</strong><small>COD and supported secure online payments</small></span></div>
        <div><span className="benefit-icon"><Store size={20}/></span><span><strong>Support local businesses</strong><small>One marketplace, many neighbourhoods</small></span></div>
      </section>

      <section className="category-section" id="discover">
        <div className="section-heading"><div><div className="eyebrow muted">A WORLD OF CHOICE</div><h2>What are you <em>in the mood for?</em></h2></div><button className="view-all" onClick={()=>setActiveCategory('All')}>View all categories <ArrowRight size={16}/></button></div>
        <div className="category-row">{categories.map(c=><button key={c.name} className={`category-chip ${activeCategory===c.name?'selected':''}`} onClick={()=>setActiveCategory(c.name)}><span>{c.icon}</span>{c.name}</button>)}</div>
      </section>

      <section className="market-section">
        <div className="section-heading market-heading"><div><div className="eyebrow muted">PICKED FOR YOUR NEIGHBOURHOOD</div><h2>{search ? `Results for “${search}”` : activeCategory==='All'?'Popular near you':activeCategory}</h2><p>Explore local favourites, freshly stocked and ready to go.</p></div><div className="filters"><SlidersHorizontal size={17}/><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort products"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="rating">Top rated</option></select></div></div>
        <div className="product-grid">{products.map(p=><article className="product-card" key={p.id}><div className={`product-image ${p.color}`}><span className="product-emoji">{p.emoji}</span>{p.badge&&<span className="product-badge">{p.badge}</span>}<button className={`heart-button ${saved.includes(p.id)?'saved':''}`} aria-label="Save item" onClick={()=>toggleSaved(p.id)}><Heart size={17} fill={saved.includes(p.id)?'currentColor':'none'}/></button><span className="delivery-time"><Clock3 size={12}/>{p.eta}</span></div><div className="product-info"><div className="product-meta"><span>{p.brand}</span><span className="rating"><Star size={12} fill="currentColor"/>{p.rating}</span></div><h3>{p.name}</h3><p className="shop-name"><Store size={12}/>{p.shop}</p><div className="product-bottom"><div><strong>{money(p.price)}</strong>{p.oldPrice&&<del>{money(p.oldPrice)}</del>}<small>{p.unit}</small></div>{cart[p.id]?<div className="quantity-control"><button onClick={()=>change(p.id,-1)} aria-label="Remove one"><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={()=>change(p.id,1)} aria-label="Add one"><Plus size={14}/></button></div>:<button className="add-button" onClick={()=>add(p)}><Plus size={16}/> Add</button>}</div></div></article>)}</div>
        {products.length===0&&<div className="empty-state"><span>🔎</span><h3>No matches just yet</h3><p>Try another search or browse all categories.</p><button className="primary-button" onClick={()=>{setSearch('');setActiveCategory('All')}}>Browse everything</button></div>}
      </section>

      <section className="partner-banner"><div className="partner-copy"><div className="eyebrow">GROW WITH WANTED</div><h2>Your business belongs<br/>in <em>the neighbourhood.</em></h2><p>Bring your shop, restaurant or supply business to more customers with one simple platform.</p><button className="light-button" onClick={()=>{setRole('Shop partner');setToast('Partner onboarding preview selected');setTimeout(()=>setToast(''),2000)}}>Become a partner <ArrowRight size={16}/></button></div><div className="partner-tiles"><div><span>🏪</span><strong>Local shops</strong><small>Reach nearby customers</small></div><div><span>🍽️</span><strong>Restaurants</strong><small>Put your menu on the map</small></div><div><span>📦</span><strong>Suppliers</strong><small>Connect with retailers</small></div><div><span>🛵</span><strong>Delivery partners</strong><small>Earn on your schedule</small></div></div></section>

      <section className="trust-strip"><div><span className="trust-symbol">W.</span><div><strong>One app. More possibilities.</strong><small>Shop, eat, stock up and support your local community.</small></div></div><div className="trust-points"><span><Leaf size={16}/> Local discovery</span><span><ShieldCheck size={16}/> Secure by design</span><span><Bike size={16}/> Delivery tracking</span></div></section>
    </main>

    <footer><a className="brand footer-brand" href="#"><span className="brand-mark">W</span><span>Wanted<span className="brand-dot">.</span><small>EVERYTHING, NEARBY</small></span></a><p>Bringing your neighbourhood closer, one order at a time.</p><div className="footer-links"><a href="#discover">Explore</a><a href="#discover">Partner with us</a><a href="#discover">Help & support</a><a href="#discover">Privacy</a></div><small className="copyright">© 2026 Wanted Marketplace. Demo experience. *Regulated categories vary by location.</small></footer>

    {showCart&&<div className="overlay" onClick={()=>setShowCart(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-header"><div><div className="eyebrow muted">YOUR ORDER</div><h2>Your bag <span>({itemCount})</span></h2></div><button className="icon-button" onClick={()=>setShowCart(false)}><X/></button></div>{cartItems.length===0?<div className="empty-cart"><span>🛍️</span><h3>Your bag is waiting</h3><p>Add a few local favourites to get started.</p><button className="primary-button" onClick={()=>setShowCart(false)}>Explore products</button></div>:<><div className="cart-items">{cartItems.map(p=><div className="cart-item" key={p.id}><div className={`cart-emoji ${p.color}`}>{p.emoji}</div><div className="cart-item-main"><strong>{p.name}</strong><small>{p.shop} · {p.unit}</small><b>{money(p.price*p.qty)}</b></div><div className="quantity-control"><button onClick={()=>change(p.id,-1)}><Minus size={13}/></button><b>{p.qty}</b><button onClick={()=>change(p.id,1)}><Plus size={13}/></button></div></div>)}</div><div className="checkout-box"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery fee</span><span>Calculated at checkout</span></div><div className="checkout-total"><span>Estimated total</span><strong>{money(subtotal)}</strong></div><p>Payment options can include COD, UPI, cards and supported wallets after provider setup.</p><button className="primary-button checkout-button" onClick={checkout}>Continue to checkout <ArrowRight size={17}/></button></div></>}</aside></div>}
    {toast&&<div className="toast"><span>✓</span>{toast}</div>}
    <div className="disclaimer">Marketplace preview · Prices, delivery times, locations, checkout and tracking are sample/demo data.</div>
  </div>;
}
