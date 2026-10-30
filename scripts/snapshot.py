from pathlib import Path
from bs4 import BeautifulSoup
base = Path(__file__).resolve().parents[1]
build = base/'build'
source = build/'kb/incidents/4471-review/index.html'
soup = BeautifulSoup(source.read_text(),'html.parser')
for script in soup.find_all('script'):
    script.decompose()
for link in soup.find_all('link'):
    if 'stylesheet' in link.get('rel',[]):
        css = (source.parent / link['href']).resolve()
        assert css.is_relative_to(build.resolve()) and css.exists(), css
        style = soup.new_tag('style')
        style.string = css.read_text()
        link.replace_with(style)
    else:
        link.decompose()
for a in soup.find_all('a',href=True):
    if a['href'].startswith('/kb'):
        a['href'] = 'build'+a['href'].rstrip('/')+'/index.html'
text=soup.get_text(' ',strip=True)
assert '379' in text and '33' in text and 'DR-' in text
assert soup.find('svg') and len(soup.find_all('table')) >= 5
assert 'no desk ref:' not in text
(base/'rendered.html').write_text(str(soup))
print('Self-contained snapshot extracted from actual Svelte SSR output.')
