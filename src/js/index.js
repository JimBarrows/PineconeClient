/**
 * Created by JimBarrows on 10/8/19.
 */

import {library}                                        from '@fortawesome/fontawesome-svg-core'
import {faBan, faEdit, faPlus, faSave, faSync, faTrash} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import React                                            from 'react'
import ReactDOM                                         from 'react-dom'
import 'react-quill/dist/quill.snow.css'
import {BrowserRouter}                                  from 'react-router-dom'
import App                                              from './App'
import registerServiceWorker                            from './registerServiceWorker'


library.add(
	faBan,
	faEdit,
	faPlus,
	faSave,
	faSync,
	faTrash
)

ReactDOM.render(
	<BrowserRouter >
		<App />
	</BrowserRouter >,

	document.getElementById('app'))

registerServiceWorker()
