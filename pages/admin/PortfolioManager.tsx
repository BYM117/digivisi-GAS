import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { PortfolioItem, ServiceType } from '../../types';

const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: ServiceType.FRAME,
    imageUrl: '',
    description: ''
  });

  // Fetch Data
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "portfolio"), (snapshot) => {
      const loadedItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as PortfolioItem[];
      setItems(loadedItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleDelete = async (id: string) => {
    if (window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, "portfolio", id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "portfolio"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      setFormData({ title: '', category: ServiceType.FRAME, imageUrl: '', description: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio Manager</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-black text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold hover:bg-neutral-800 transition-colors"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-400">Loading Projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 && (
            <div className="col-span-full text-center py-12 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-neutral-500">등록된 포트폴리오가 없습니다. 프로젝트를 추가해주세요.</p>
            </div>
          )}
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden group relative">
              <div className="aspect-video bg-neutral-100 relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur p-1 rounded text-white">
                  <span className="text-[10px] font-bold px-1">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex gap-2 pt-2 border-t border-neutral-100">
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-full py-2 flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={14} className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-100 flex justify-between items-center bg-brand-black text-white">
              <h3 className="font-bold">Add New Project</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full border border-neutral-300 rounded p-2 focus:outline-none focus:border-brand-black"
                  placeholder="Project Name"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as ServiceType})}
                  className="w-full border border-neutral-300 rounded p-2 focus:outline-none focus:border-brand-black"
                >
                  <option value={ServiceType.FRAME}>Digital Frame</option>
                  <option value={ServiceType.PHOTO_VIDEO}>Photo / Video</option>
                  <option value={ServiceType.AI_CREATIVE}>AI Creative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Image URL</label>
                <input 
                  type="url" required
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full border border-neutral-300 rounded p-2 focus:outline-none focus:border-brand-black"
                  placeholder="https://..."
                />
                <p className="text-[10px] text-neutral-400 mt-1">Direct link to image (e.g. Unsplash, Imgur)</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full border border-neutral-300 rounded p-2 focus:outline-none focus:border-brand-black resize-none"
                  placeholder="Brief description of the project..."
                ></textarea>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 text-sm font-bold text-neutral-500 hover:bg-neutral-100 rounded"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-brand-red text-white text-sm font-bold rounded hover:bg-red-700 shadow-lg flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;