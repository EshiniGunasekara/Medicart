import { useMemo, useState } from 'react'
import { Search, ShoppingBag, Heart, ShieldCheck, Truck, Clock3, Plus, Minus, X, Menu, ChevronRight, Pill, Activity, Sparkles, Baby, Stethoscope, CheckCircle2, MapPin, Phone } from 'lucide-react'

const products = [
  { id: 1, name: 'Daily Vitamin C', detail: 'Immune support · 60 tablets', category: 'Vitamins', price: 1450, old: 1750, tag: 'Bestseller', icon: '🍊', color: 'peach' },
  { id: 2, name: 'Gentle Hand Sanitiser', detail: 'Skin-friendly · 250 ml', category: 'Personal care', price: 890, icon: '🫧', color: 'blue' },
  { id: 3, name: 'Digital Thermometer', detail: 'Fast reading · Easy to use', category: 'Health devices', price: 2350, icon: '🌡️', color: 'lavender', tag: 'Popular' },
  { id: 4, name: 'Daily Multivitamins', detail: 'Everyday wellness · 30 tablets', category: 'Vitamins', price: 2100, icon: '🌿', color: 'mint' },
  { id: 5, name: 'First Aid Essentials Kit', detail: 'Home & travel · 12 pieces', category: 'First aid', price: 3200, icon: '🩹', color: 'pink' },
  { id: 6, name: 'Hydrating Face Moisturiser', detail: 'Gentle hydration · 100 ml', category: 'Personal care', price: 1850, icon: '🧴', color: 'yellow' },
  { id: 7, name: 'Reusable Hot Water Bottle', detail: 'Comfort care · 1.8 L', category: 'Health devices', price: 2750, icon: '💧', color: 'blue' },
  { id: 8, name: 'Baby Care Starter Pack', detail: 'Everyday essentials · 5 items', category: 'Baby care', price: 3950, icon: '🧸', color: 'peach' },
]
const categories = [
  { name: 'All products', icon: Sparkles },
  { name: 'Vitamins', icon: Activity },
  { name: 'Personal care', icon: Heart },
  { name: 'Health devices', icon: Stethoscope },
  { name: 'First aid', icon: ShieldCheck },
  { name: 'Baby care', icon: Baby },
]
const money = n => `LKR ${n.toLocaleString('en-LK')}`

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All products')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState('')
  const [checkout, setCheckout] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shown = useMemo(() => products.filter(p =>
    (category === 'All products' || p.category === category) &&
    `${p.name} ${p.detail} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [query, category])
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0)
  const add = p => { setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 })); setNotice(`${p.name} added to your bag`); setTimeout(() => setNotice(''), 2200) }
  const change = (id, amount) => setCart(c => { const next = { ...c, [id]: Math.max(0, (c[id] || 0) + amount) }; if (!next[id]) delete next[id]; return next })
  const submitOrder = e => { e.preventDefault(); setOrderPlaced(true); setCart({}); }

  return <div className="app-shell">
    <div className="announcement"><ShieldCheck size={14} /> Your health matters. Shop trusted everyday essentials with care.</div>
    <header className="header">
      <button className="mobile-toggle icon-button" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}><Menu size={22}/></button>
      <a className="brand" href="#" aria-label="MediCart home"><span className="brand-mark"><Plus size={25} strokeWidth={3.5}/></span><span>Medi<span>Cart</span><small>PHARMACY & WELLNESS</small></span></a>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a><a href="#why" onClick={() => setMobileMenu(false)}>Why MediCart</a><a href="#help" onClick={() => setMobileMenu(false)}>Help & support</a>
      </nav>
      <div className="header-actions"><span className="secure-label"><ShieldCheck size={16}/> Safe & secure</span><button className="cart-button" onClick={() => { setCartOpen(true); setCheckout(false); setOrderPlaced(false) }}><ShoppingBag size={18}/><span>My bag</span><b>{count}</b></button></div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy"><div className="eyebrow"><span></span> A LITTLE CARE GOES A LONG WAY</div><h1>Good health,<br/><em>made simpler.</em></h1><p>Your everyday pharmacy and wellness essentials, all in one place. Thoughtfully selected and delivered with care.</p><div className="hero-actions"><a className="primary-button" href="#shop">Explore products <ChevronRight size={18}/></a><div className="delivery-note"><Truck size={19}/><span><b>Care at your door</b><small>Convenient delivery options</small></span></div></div><div className="hero-trust"><span><CheckCircle2 size={16}/> Carefully selected essentials</span><span><CheckCircle2 size={16}/> Friendly support</span></div></div>
        <div className="hero-art" aria-label="Illustration of pharmacy and wellness products"><div className="art-circle circle-one"></div><div className="art-circle circle-two"></div><div className="sunshine"></div><div className="plant plant-one">✳</div><div className="plant plant-two">✦</div><div className="product-bottle bottle-green"><div className="bottle-cap"></div><div className="bottle-label"><Plus size={25}/><b>daily<br/>care</b></div></div><div className="product-bottle bottle-cream"><div className="bottle-cap"></div><div className="bottle-label"><span>wellness</span><b>VITAMIN<br/>COMPLEX</b></div></div><div className="product-box"><div className="box-cross"><Plus size={36}/></div><b>care<br/>essentials</b></div><div className="floating-card"><span className="floating-icon"><Heart size={17}/></span><span><b>Care, every day</b><small>Little things matter</small></span></div><div className="art-caption">YOUR WELLNESS, OUR PRIORITY <span>✳</span></div></div>
        <div className="hero-bottom-shape"></div>
      </section>

      <section className="benefits" id="why"><div className="benefit"><span className="benefit-icon mint-icon"><ShieldCheck/></span><div><b>Trusted essentials</b><small>Quality-first product selection</small></div></div><div className="benefit"><span className="benefit-icon peach-icon"><Truck/></span><div><b>Convenient delivery</b><small>Options to fit your routine</small></div></div><div className="benefit"><span className="benefit-icon lilac-icon"><Clock3/></span><div><b>Simple shopping</b><small>Find what you need, easily</small></div></div><div className="benefit"><span className="benefit-icon yellow-icon"><Heart/></span><div><b>Here to help</b><small>Friendly customer support</small></div></div></section>

      <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow"><span></span> YOUR EVERYDAY WELLNESS</div><h2>Small essentials.<br/><em>Meaningful care.</em></h2></div><p>Explore our hand-picked range of health, personal care and wellness essentials.</p></div>
        <div className="shop-toolbar"><div className="category-tabs">{categories.map(c => {const Icon = c.icon; return <button key={c.name} className={category === c.name ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(c.name)}><Icon size={16}/>{c.name}</button>})}</div><label className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search essentials..." aria-label="Search products"/>{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={15}/></button>}</label></div>
        <div className="results-line"><span>{shown.length} products to explore</span><span>Prices shown in LKR</span></div>
        <div className="product-grid">{shown.map(p => <article className="product-card" key={p.id}><div className={`product-visual ${p.color}`}>{p.tag && <span className="product-tag">{p.tag}</span>}<button className="wish-button" aria-label={`Save ${p.name}`} onClick={() => setNotice('Wishlist is a demo feature') }><Heart size={17}/></button><span className="product-emoji">{p.icon}</span><span className="visual-caption">{p.category}</span></div><div className="product-info"><span className="product-category">{p.category}</span><h3>{p.name}</h3><p>{p.detail}</p><div className="product-bottom"><div><b>{money(p.price)}</b>{p.old && <del>{money(p.old)}</del>}</div><button className="add-button" aria-label={`Add ${p.name} to bag`} onClick={() => add(p)}><Plus size={18}/></button></div></div></article>)}</div>
        {shown.length === 0 && <div className="empty-state"><Search size={28}/><h3>No products found</h3><p>Try another search or choose a different category.</p><button className="primary-button" onClick={() => {setQuery('');setCategory('All products')}}>Show all products</button></div>}
      </section>

      <section className="care-banner"><div className="care-symbol"><Heart size={28}/></div><div><span className="eyebrow">A NOTE FROM US</span><h2>Your wellbeing comes first.</h2><p>Need advice about a medicine? Speak with a qualified pharmacist. This demo shop does not provide medical advice.</p></div><a href="#help" className="light-button">Get in touch <ChevronRight size={17}/></a></section>
      <section className="support-section" id="help"><div><span className="eyebrow"><span></span> WE'RE HERE FOR YOU</div><h2>Need a hand?</h2><p>Our friendly support team can help with general order questions.</p></div><div className="support-contact"><MapPin size={19}/><span><b>Delivery coverage</b><small>Confirm service availability at checkout</small></span></div><div className="support-contact"><Phone size={19}/><span><b>Customer support</b><small>Contact details can be configured by the store owner</small></span></div></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#"><span className="brand-mark"><Plus size={22} strokeWidth={3.5}/></span><span>Medi<span>Cart</span><small>PHARMACY & WELLNESS</small></span></a><p>Everyday essentials, delivered with care.</p><small>© 2026 MediCart demo store. Not a real pharmacy. Product listings are illustrative; consult a qualified healthcare professional for medical advice.</small></footer>

    {notice && <div className="toast" role="status"><CheckCircle2 size={18}/>{notice}</div>}
    {cartOpen && <div className="drawer-backdrop" onMouseDown={e => { if(e.target === e.currentTarget) setCartOpen(false) }}><aside className="cart-drawer"><div className="drawer-header"><div><span className="eyebrow">YOUR ORDER</span><h2>{checkout ? 'Delivery details' : orderPlaced ? 'Order received' : 'Your bag'} <span>({count})</span></h2></div><button className="icon-button" aria-label="Close bag" onClick={() => setCartOpen(false)}><X/></button></div>
      {orderPlaced ? <div className="order-success"><CheckCircle2 size={48}/><h3>Thanks, {customerName}!</h3><p>Your demo order has been recorded in this page only. No payment was taken and no real delivery has been scheduled.</p><button className="primary-button" onClick={() => {setCartOpen(false);setOrderPlaced(false);setCheckout(false)}}>Continue shopping</button></div> : checkout ? <form className="checkout-form" onSubmit={submitOrder}><p className="demo-warning">Demo checkout — do not enter real payment details. This form does not submit an actual pharmacy order.</p><label>Full name<input required value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Your name"/></label><label>Phone number<input required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Contact number" inputMode="tel"/></label><label>Delivery address<textarea required value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} placeholder="Street, town and delivery notes" rows="3"/></label><div className="drawer-total"><span>Demo subtotal</span><b>{money(total)}</b></div><button className="primary-button full-button" type="submit">Place demo order <ChevronRight size={18}/></button><button type="button" className="back-link" onClick={() => setCheckout(false)}>← Back to bag</button></form> : <>{count === 0 ? <div className="empty-cart"><span className="empty-bag"><ShoppingBag size={30}/></span><h3>Your bag is taking a little rest.</h3><p>Add a few essentials and they'll appear here.</p><button className="primary-button" onClick={() => setCartOpen(false)}>Explore products</button></div> : <><div className="cart-items">{products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><div className={`cart-thumb ${p.color}`}>{p.icon}</div><div className="cart-item-main"><b>{p.name}</b><span>{money(p.price)}</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => change(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button aria-label="Increase quantity" onClick={() => change(p.id,1)}><Plus size={13}/></button></div></div><button className="remove-item" aria-label={`Remove ${p.name}`} onClick={() => change(p.id,-cart[p.id])}><X size={16}/></button></div>)}</div><div className="drawer-footer"><div className="drawer-total"><span>Subtotal</span><b>{money(total)}</b></div><p>Delivery fees, availability and final pricing would be confirmed by a real store.</p><button className="primary-button full-button" onClick={() => setCheckout(true)}>Continue to demo checkout <ChevronRight size={18}/></button><button className="back-link" onClick={() => setCartOpen(false)}>Continue shopping</button></div></>}</>}
    </aside></div>}
  </div>
}
