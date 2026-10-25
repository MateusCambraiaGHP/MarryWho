import { Ceremony } from './components/Ceremony';
import { Couple } from './components/Couple';
import { Fireworks } from './components/Fireworks';
import { Footer } from './components/Footer';
import { Gifts } from './components/Gifts';
import { Hero, WelcomeLetter } from './components/Hero';
import { Messages } from './components/Messages';
import { Nav } from './components/Nav';
import { Rsvp } from './components/Rsvp';
import { SkipLink } from './components/SkipLink';

export default function App() {
  return (
    <>
      <SkipLink />
      <Fireworks />
      <Nav />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <WelcomeLetter />
        <Couple />
        <Ceremony />
        <Gifts />
        <Rsvp />
        <Messages />
      </main>
      <Footer />
    </>
  );
}
