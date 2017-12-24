/**
 * Imports the Sass file, and converts it to a css string for use in the
 * web component's template.
 */
import css from 'css-loader!sass-loader!./autocomplete.scss';
const CSS = css.toString();

import HTML from 'html-loader!./autocomplete.html';

/**
 * @class
 * @memberof  Matrix
 * @classdesc <m-autocomplete> defines an input element that is pre-populated
 *            with fetched data, accessible from a drop down. When the user
 *            types, the drop down shows, and a value can be selected by the
 *            keyboard or mouse.
 */
class MAutocomplete extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        // Initialise HTML and CSS
        const self = this;
        self.shadowRoot.innerHTML = HTML;
        const style = document.createElement('style');
        style.innerHTML = CSS;
        self.shadowRoot.prepend(style);

        const matchList = document.createElement('ul');
        matchList.className = 'list';
        const url = 'http://localhost:3000/api/v1/people';

        const searchInput = this.shadowRoot.querySelector('input');
        let jsonData = null;
        fetch(url).then(res => res.json())
        .then(apiData => {
            jsonData = apiData;
        });
        searchInput.addEventListener('keyup', event => {
            const input = event.target.value;

            jsonData.filter(data => {
                if (data.name.first.indexOf(input) > -1) {
                    return data;
                }
            })
                    .map(data => {
                        matchList.innerHTML = '';
                        const listRow = document.createElement('li');

                        const profileImg = document.createElement('img');
                        profileImg.src = data.profile;
                        profileImg.width = 35;
                        profileImg.height = 35;
                        profileImg.className = 'profile-img';
                        listRow.appendChild(profileImg);

                        const userName = `${data.name.first} ${data.name.last}`;
                        const userText = document.createElement('div');
                        userText.innerHTML = userName;

                        listRow.appendChild(userText);
                        matchList.appendChild(listRow);
                    });
            self.shadowRoot.appendChild(matchList);
        });
    }
}

// Register the custom element for use
window.customElements.define('m-autocomplete', MAutocomplete);
