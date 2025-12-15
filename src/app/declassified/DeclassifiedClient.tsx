'use client';

import Background from '@/components/Background';
import CategorySection from '@/components/CategorySection';
import { documentCategories } from '@/data/documents';

export default function DeclassifiedClient() {
    // Calculate total documents across all categories
    const totalDocuments = documentCategories.reduce(
        (sum, cat) => sum + cat.documents.length,
        0
    );

    return (
        <Background>
            <div className="declassified-page">
                <div className="declassified-container">
                    {/* Header */}
                    <header className="declassified-header">
                        <div className="header-title">
                            <div className="mono declassified-subtitle">:: RESTRICTED ACCESS</div>
                            <h1 className="declassified-page-title">DECLASSIFIED DOCUMENTS</h1>
                        </div>
                        <div className="mono declassified-count">
                            TOTAL FILES: [{totalDocuments}] // CATEGORIES: [{documentCategories.length}]
                        </div>
                    </header>

                    {/* Category Sections */}
                    <div className="categories-list">
                        {documentCategories.map((category) => (
                            <CategorySection key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </div>
        </Background>
    );
}
