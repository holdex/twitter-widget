import './index.css';

export default class Twitter {

    constructor({ data, api, readOnly }) {
        this.api = api;
        this._data = {};
        this.element = null;
        this.readOnly = readOnly;

        this.data = data;
    }

    set data(data) {
        if (!(data instanceof Object)) {
            throw Error('Twitter Tool data should be object');
        }

        const { service, source, embed, width, height, caption = '' } = data;

        this._data = {
            service: service || this.data.service,
            source: source || this.data.source,
            embed: embed || this.data.embed,
            width: width || this.data.width,
            height: height || this.data.height,
            caption: caption || this.data.caption || '',
        };

        const oldView = this.element;

        if (oldView) {
            oldView.parentNode.replaceChild(this.render(), oldView);
        }
    }

    /**
     * @returns {EmbedData}
     */
    get data() {
        if (this.element) {
            const caption = this.element.querySelector(`.${this.api.styles.input}`);

            this._data.caption = caption ? caption.innerHTML : '';
        }

        return this._data;
    }

    /**
     * Get plugin styles
     *
     * @returns {object}
     */
    get CSS() {
        return {
            baseClass: this.api.styles.block,
            input: this.api.styles.input,
            container: 'twitter-tool',
            containerLoading: 'twitter-tool--loading',
            preloader: 'twitter-tool__preloader',
            caption: 'twitter-tool__caption',
            url: 'twitter-tool__url',
            content: 'twitter-tool__content',
        };
    }

    /**
     * Render Twitter tool content
     *
     * @returns {HTMLElement}
     */
    render() {
        if (!this.data.service) {
            const container = document.createElement('div');

            this.element = container;

            return container;
        }
        const container = document.createElement('div');
        const caption = document.createElement('div');
        const template = document.createElement('template');
        const preloader = this.createPreloader();

        container.classList.add(this.CSS.baseClass, this.CSS.container, this.CSS.containerLoading);
        caption.classList.add(this.CSS.input, this.CSS.caption);

        container.appendChild(preloader);

        caption.contentEditable = !this.readOnly;
        caption.dataset.placeholder = 'Enter a caption';
        caption.innerHTML = this.data.caption || '';

        template.content.firstChild.setAttribute('src', this.data.embed);
        template.content.firstChild.classList.add(this.CSS.content);

        const embedIsReady = this.embedIsReady(this.data.embed);

        embedIsReady
            .then((html) => {
                container.classList.remove(this.CSS.containerLoading);
                template.innerHTML = html;
            });

        container.appendChild(caption);
        container.appendChild(template.content.firstChild);

        this.element = container;

        return container;
    }

    /**
     * Creates preloader to append to container while data is loading
     *
     * @returns {HTMLElement}
     */
    createPreloader() {
        const preloader = document.createElement('preloader');
        const url = document.createElement('div');

        url.textContent = this.data.source;

        preloader.classList.add(this.CSS.preloader);
        url.classList.add(this.CSS.url);

        preloader.appendChild(url);

        return preloader;
    }

    /**
     * Save current content and return EmbedData object
     *
     * @returns {EmbedData}
     */
    save() {
        return this.data;
    }

    /**
     * Handle pasted url and return Service object
     *
     * @param {PasteEvent} event - event with pasted data
     */
    onPaste(event) {
        const { key: service, data: url } = event.detail;

        const { regex, embedUrl, width, height, id = (ids) => ids.shift() } = Embed.services[service];
        const result = regex.exec(url).slice(1);
        const embed = embedUrl.replace(/<%= remote_id %>/g, id(result));

        this.data = {
            service,
            source: url,
            embed,
            width,
            height,
        };
    }

    static prepare({ config = {} }) {
        const { services = {}, fetch } = config;

        const userServices = Object
            .entries(services)
            .filter(([key, value]) => {
                return typeof value === 'object';
            })
            .map(([key, service]) => {
                const { regex, embedUrl, html, height, width, id } = service;

                return [key, {
                    regex,
                    embedUrl,
                    html,
                    height,
                    width,
                    id,
                }];
            });

        Embed.services = userServices.reduce((result, [key, service]) => {
            if (!(key in result)) {
                result[key] = service;

                return result;
            }

            result[key] = Object.assign({}, result[key], service);

            return result;
        }, {});

        Embed.patterns = userServices
            .reduce((result, [key, item]) => {
                result[key] = item.regex;

                return result;
            }, {});

        Embed.fetch = fetch;
    }

    /**
     * Paste configuration to enable pasted URLs processing by Editor
     *
     * @returns {object} - object of patterns which contain regx for pasteConfig
     */
    static get pasteConfig() {
        return {
            patterns: Embed.patterns,
        };
    }

    /**
     * Notify core that read-only mode is supported
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Checks that mutations in DOM have finished after appending iframe content
     *
     * @param {HTMLElement} targetNode - HTML-element mutations of which to listen
     * @returns {Promise<any>} - result that all mutations have finished
     */
    embedIsReady(embedUrl) {
        return Embed.fetch({ url: embedUrl, method: 'GET' });
    }
}