import Modal from "./modal";

export default class SourceModal extends Modal {

    proceed() {
        let $sourceInput = document.getElementById('source-url');
        if($sourceInput.checkValidity()) {
            // inspect the url for rss

        } else {
            alert('show errors');
        }
    }

    static listen() {
        let $addBtn = document.querySelector('.js-add-source');
        $addBtn.addEventListener('click', SourceModal.toggle);
    }

    static toggle() {
        if (Modal.instance) {
            Modal.instance.close();
        } else {
            SourceModal.open();
        }
    }

    static open() {
        let markup = `
            <header><h2>Add a source</h2></header>
            <div class="container">
                <div class="input-group">
                    <label>
                        Source of news
                    </label>
                    <input required id="source-url" type="url">
                </div>
            </div>
            <div class="submit">
                <button class="js-ok modal__btn">Add</button>
                <button class="js-cancel modal__btn modal__btn--link">Cancel</button>
            </div>
        `;
        let modal = new this(markup);
        modal.open();
    }

    static close() {
        Modal.instance.close();
    }
}
