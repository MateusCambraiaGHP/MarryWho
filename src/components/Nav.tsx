import { useEffect, useRef, useState } from 'react';
import { navigationItems } from '../content/navigation';

function MenuIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      {isOpen ? (
        <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function Nav() {
  const [activeSection, setActiveSection] = useState(navigationItems[0].id);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateState = () => {
      animationFrame = 0;
      setIsScrolled(window.scrollY > 16);

      let currentSection = navigationItems[0].id;
      for (const item of navigationItems) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 140) {
          currentSection = item.id;
        }
      }
      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateState);
      }
    };

    updateState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`} ref={headerRef}>
      <nav className="nav container" aria-label="Navegação principal">
        <a className="nav__brand" href="#inicio" aria-label="Lorenna e Bruno — voltar ao início">
          <span>L</span>
          <span className="nav__amp" aria-hidden="true">
            &amp;
          </span>
          <span>B</span>
        </a>

        <button
          className="nav__toggle"
          type="button"
          ref={toggleRef}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <MenuIcon isOpen={isMenuOpen} />
        </button>

        <ul className="nav__links" aria-label="Seções do site">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <a
                className="nav__link"
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isMenuOpen ? (
        <nav className="nav__mobile" id="menu-mobile" aria-label="Menu do site">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  className="nav__mobile-link"
                  href={`#${item.id}`}
                  aria-current={activeSection === item.id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {item.fullLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
