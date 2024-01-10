import isPrimary from 'node:cluster'
import isWorker from 'node:cluster'

import {EventEmitter} from 'node:events'
import fs from 'node:fs'
import * as nodePath from 'node:path'

namespace cluer {
    // constructor options
    export interface IClassOptions {
        // set as core primary or core worker
        hierarchy : 'primary'|'worker'
    }
    // the type of index to create
    export interface IIndexSpecifier {
        ext?: string
    }
    //
    export interface INodeSpecifier {}
    // specifies an index type
    export interface IMessage {
        // o: object,
        // t: Date,
        // payload?: <T>
    }
    export interface ICluerNode {
        hash?: string,
        subversion?: 1 | 2 | 3,
        d: {}
    }
    export interface IFlagsOpts {
        isPrimary: boolean,
        isWorker: boolean
    }
    export interface IOperations {
        [key: string]: (...args: any[]) => void
    }
    export interface IOperation {
        func: string,
        payload: {}
    }
    export class Cluer {
        /* */
        static MSG_EMPTY= { o:{}, T:Date.now() }
        /* */
        static OPS_CLUER: IOperations = {
            // ---- lifecycle grouping
            // -- worker GoodToGo
            heartbeat() {},
            // -- index grouping
            create_index(specifier: IIndexSpecifier) {},
            get_index(specifier: IIndexSpecifier) {},
            // ---- node grouping
            path_exists(specifier: INodeSpecifier) {},
            // -- hash operations
            get_hash(specifier: INodeSpecifier) {},
            // -- disk operations
            // ==> returns ICluerNode if one or a ICluerRecord if many
            get_path(specifier: INodeSpecifier) {},
            // ==> return the number of dirs for a node on FS
            get_node_count(specifier: INodeSpecifier) {}
        }
        static CONFIG= {}
        static FLAGS_DEFAULT:IFlagsOpts= {
            isPrimary: false,
            isWorker: false
        }
        f:IFlagsOpts= Cluer.FLAGS_DEFAULT
        #reset_flags() {
            this.f= Object.assign(
                {},
                Cluer.FLAGS_DEFAULT
            )
        }
        #create_worker() {
        }
        constructor(opts: IClassOptions= {hierarchy: 'primary'}) {
            this.#reset_flags()
            this.f.isPrimary= isPrimary && 'primary'===opts.hierarchy
            this.f.isWorker= isWorker && 'worker'===opts.hierarchy
        }
        post_msg<T>(op:IOperation, message: IMessage) {
            if(this.f.isPrimary) {
                const {func, payload}= op
                let newMessage= Object.assign({}, Cluer.MSG_EMPTY)
                Cluer.OPS_CLUER[func](payload)
            }
        }
        listen_msg(message: IMessage) {
            if (isWorker) {
                try {
                }
                catch(err) {
                    // trigger flag
                }
            }
        }
    }
    export interface IParsedArgs {}
    export interface IArgValues {}
    /* */
    export class CluerCLI {
        argv= {}
        parsed_args= {}
        constructor() {
        }
        // --
        #reset() {}
        parse() {}
        // --
        static ARGS= {
            'verbose': {},
            'debug': {},
            'index': {},
            'prop': {},
            'path': {}
        }
        // --
    }
    /* extend the class with a FastifyServer - to serve a control panel */
    export class FastifyServer extends Cluer {
        constructor() {
            super()
        }
        // --
        #setup() {}
        /* */
        static OPS_SERVER= {
            get_index() {},
            view() {},
            properties() {}
        }
        // --
        execute() {}
    }
    /* self contained HTML Interface */
    export class HTMLControlPanel {
        constructor() {
            // vue js --
        }
        // --
        #setup() {}
        /* */
        static OPS_HTML= {
            // get index component to inject control panel
            get_index() {},
            get_control_panel() {}
        }
        // --
        execute() {}
    }
}

