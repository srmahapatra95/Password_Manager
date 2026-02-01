import React from 'react'
import { XCircle, KeyRound, Copy, Check } from 'lucide-react'
import { useState } from 'react'

function KeyModal({ keyValue, onClose }) {
    const [copied, setCopied] = useState(false)

    function handleCopy() {
        navigator.clipboard.writeText(keyValue)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-stone-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                            <KeyRound className="w-4 h-4 text-indigo-500" />
                        </div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold">Encryption Key</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-rose-500 transition-colors cursor-pointer">
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-5">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Save this key securely. You will need it to decrypt your password.</p>
                    <div className="flex items-center gap-2 bg-stone-50 dark:bg-gray-700/40 border border-stone-200 dark:border-gray-600 rounded-xl px-4 py-3">
                        <code className="flex-1 text-sm text-gray-900 dark:text-gray-100 break-all font-mono">{keyValue}</code>
                        <button onClick={handleCopy} className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all cursor-pointer">
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                <div className="px-5 pb-5">
                    <button onClick={onClose} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-all cursor-pointer shadow-sm shadow-indigo-500/20">
                        Done
                    </button>
                </div>
            </div>
        </div>
    )
}

export default KeyModal
