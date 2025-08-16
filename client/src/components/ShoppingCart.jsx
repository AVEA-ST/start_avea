import React, { useState, useEffect } from 'react';

const ShoppingCart = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(subtotal * 0.1);
      alert('Coupon applied! 10% discount added.');
    } else if (couponCode.toLowerCase() === 'student20') {
      setDiscount(subtotal * 0.2);
      alert('Coupon applied! 20% discount added.');
    } else {
      alert('Invalid coupon code. Try "WELCOME10" or "STUDENT20"');
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode('');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Thank you for your purchase! You will receive an email confirmation shortly.');
      onClose();
      setIsCheckingOut(false);
      // Clear cart after successful purchase
      cart.forEach(item => onRemoveFromCart(item.id));
    }, 2000);
  };

  const getTotalSavings = () => {
    return cart.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      background: 'var(--bg-primary)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 1001,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: '600', color: 'var(--text-primary)' }}>
          Shopping Cart ({cart.length})
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Your cart is empty
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Add some courses to get started!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                padding: '1rem',
                position: 'relative'
              }}>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger-color)',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  ✕
                </button>
                
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {item.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      by {item.instructor}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.originalPrice > item.price && (
                      <span style={{ 
                        color: 'var(--text-light)', 
                        fontSize: 'var(--font-size-sm)', 
                        textDecoration: 'line-through' 
                      }}>
                        ${item.originalPrice}
                      </span>
                    )}
                    <span style={{ 
                      color: 'var(--primary-color)', 
                      fontSize: 'var(--font-size-lg)', 
                      fontWeight: '700' 
                    }}>
                      ${item.price}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                      ⏱ {item.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coupon Section */}
      {cart.length > 0 && (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                fontSize: 'var(--font-size-sm)'
              }}
            />
            <button
              onClick={applyCoupon}
              style={{
                padding: '0.5rem 1rem',
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600'
              }}
            >
              Apply
            </button>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--success-color)', fontSize: 'var(--font-size-sm)' }}>
                Discount applied
              </span>
              <button
                onClick={removeCoupon}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--danger-color)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)'
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {cart.length > 0 && (
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {getTotalSavings() > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--success-color)' }}>Course Savings:</span>
                <span style={{ color: 'var(--success-color)' }}>-${getTotalSavings().toFixed(2)}</span>
              </div>
            )}
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--success-color)' }}>Coupon Discount:</span>
                <span style={{ color: 'var(--success-color)' }}>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: 'var(--font-size-lg)' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            style={{
              width: '100%',
              padding: '1rem',
              background: isCheckingOut ? 'var(--text-light)' : 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              cursor: isCheckingOut ? 'not-allowed' : 'pointer',
              fontSize: 'var(--font-size-base)',
              fontWeight: '600'
            }}
          >
            {isCheckingOut ? 'Processing...' : `Checkout - $${total.toFixed(2)}`}
          </button>

          <p style={{ 
            textAlign: 'center', 
            color: 'var(--text-light)', 
            fontSize: 'var(--font-size-xs)', 
            marginTop: '0.5rem' 
          }}>
            Secure checkout powered by Stripe
          </p>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
