import isPrimary from 'node:cluster'
import isWorker from 'node:cluster'

import {EventEmitter} from 'node:events'
import fs from 'node:fs'
import * as nodePath from 'node:path'

namespace cluer {
    // constructor options
    interface IClassOptions {
        // set as core primary or core worker
        hierarchy : 'primary'|'worker'
    }
    // the type of index to create
    interface IIndexSpecifier {
        ext?: string
    }
    interface INodeSpecifier {

    }
    // specifies an index type
    interface IMessage {
        // o: object,
        // t: Date,
        // payload?: <T>
    }
    interface ICluerNode {
        hash?: string,
        subversion?: 1 | 2 | 3,
        d: {}
    }
    interface IFlagsOpts {
        isPrimary: boolean,
        isWorker: boolean
    }
    interface IOperations {
        [key: string]: (...args: any[]) => void;
    }
    interface IOperation {
        func: string,
        payload: {

        }
    }
    export class Cluer {
        static EMPTY_MSG= { o:{}, T:Date.now() }
        // TODO: metadata about the things
        static OPS: IOperations = {
            // ---- lifecycle grouping
            // -- worker GoodToGo
            heartbeat() {},

            // -- index grouping
            create_index(specifier: IIndexSpecifier) {},
            path_exists(specifier: INodeSpecifier) {},
            get_index(specifier: IIndexSpecifier) {},

            // ---- node grouping
            // -- hash operations
            get_hash(specifier: INodeSpecifier) {

            },

            // -- disk operations
            // ==> returns ICluerNode if one or a ICluerRecord if many
            get_path() {},

            // ==> return the number of dirs for a node on FS
            get_node_count(specifier: INodeSpecifier) {
            }
        }
        static CONFIG= {}
        static defaultFlags:IFlagsOpts= {
            isPrimary: false,
            isWorker: false
        }
        f:IFlagsOpts= Cluer.defaultFlags
        #reset_flags() {
            this.f=Object.assign({}, Cluer.defaultFlags)
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
                let newMessage= Object.assign({}, Cluer.EMPTY_MSG)
                Cluer.OPS[func](payload)
            }
        }
        listen_msg(message: IMessage) {
            if (isWorker) {
                try {}
                catch(err) {
                    // trigger flag
                }
            }
        }
    }

    /* extend the class with a FastifyServer - to serve a control panel */
    export class FastifyServer extends Cluer {
        constructor() {
            super()
        }
        // view() {},
        // properties() {}
        static OPS= {
            get_index() {}
        }
    }

    /* self contained HTML Interface */
    export class HTMLControlPanel {
        constructor() {
            // vue js --
            
        }
        /* */
        #setup(){}
        static OPS= {
            // get index component to inject control panel
            get_index() {},
            get_control_panel() {}
        }
    }

}

